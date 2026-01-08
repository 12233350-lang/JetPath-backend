import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MySQL Connection Pool (for reference, but we'll use direct connection in setup)
const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'JetPathAirline',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true // Allow multiple SQL statements
});

async function setupDatabase() {
  let connection;
  try {
    // Detect database configuration
    const dbHost = process.env.DB_HOST || process.env.MYSQLHOST || 'localhost';
    const dbUser = process.env.DB_USER || process.env.MYSQLUSER || 'root';
    const dbPassword = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '';
    const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || 'JetPathAirline';
    
    console.log('🔌 Connecting to MySQL database...');
    console.log(`   Host: ${dbHost}`);
    console.log(`   User: ${dbUser}`);
    console.log(`   Database: ${dbName}`);
    
    // Get connection without specifying database first
    connection = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL server');

    // Use the database (create if it doesn't exist)
    try {
      await connection.execute(`USE \`${dbName}\``);
      console.log(`✅ Using database '${dbName}'`);
    } catch (err) {
      // Database doesn't exist, create it
      if (err.code === 'ER_BAD_DB_ERROR') {
        console.log(`📦 Database '${dbName}' doesn't exist. Creating...`);
        await connection.execute(`CREATE DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        await connection.execute(`USE \`${dbName}\``);
        console.log(`✅ Database '${dbName}' created and selected`);
      } else {
        throw err;
      }
    }

    // Read and execute init_database.sql
    const sqlFile = path.join(__dirname, 'init_database.sql');
    console.log('📄 Reading SQL file...');
    
    if (!fs.existsSync(sqlFile)) {
      throw new Error(`SQL file not found: ${sqlFile}`);
    }

    const sqlScript = fs.readFileSync(sqlFile, 'utf8');
    console.log('📝 Executing SQL script to create tables...');
    
    // Split by semicolons and execute each statement
    const statements = sqlScript
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.execute(statement);
        } catch (err) {
          // Ignore errors for duplicate key or existing table errors
          if (!err.message.includes('Duplicate') && !err.message.includes('already exists')) {
            console.warn(`⚠️  Warning: ${err.message}`);
          }
        }
      }
    }

    console.log('✅ Tables created successfully');

    // Check if flights table has data
    const [flightCount] = await connection.execute('SELECT COUNT(*) as count FROM flights');
    const count = flightCount[0].count;

    if (count === 0) {
      console.log('📊 No flights found. Checking if seed data should be inserted...');
      console.log('💡 Run "node seedData.js" separately to populate flights data');
    } else {
      console.log(`✅ Found ${count} flights in database`);
    }

    // Check if users exist
    const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users');
    const userCountNum = userCount[0].count;
    console.log(`✅ Found ${userCountNum} users in database`);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Run "node seedData.js" to populate flights data (optional)');
    console.log('   2. Run "node make-admin.js" to create an admin user');
    console.log('   3. Your backend API should now be able to access the database');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    console.error('   Error code:', error.code);
    console.error('   Error message:', error.message);
    if (error.sql) {
      console.error('   SQL:', error.sql);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Connection closed');
    }
    await pool.end();
  }
}

setupDatabase();

