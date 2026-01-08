import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function makeAdmin() {
  try {
    console.log('🔧 Setting up admin user...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'JetPathAirline'
    });

    console.log('✅ Connected to database');

    // Check if any users exist
    const [users] = await connection.execute('SELECT id, email, username FROM users LIMIT 1');
    
    if (users.length === 0) {
      console.log('⚠️  No users found. Please create a user first by registering through the API.');
      console.log('💡 After registering, run this script again to make that user an admin.');
      await connection.end();
      process.exit(1);
    }

    const user = users[0];
    console.log(`📋 Found user: ${user.email} (ID: ${user.id})`);

    // Make first user admin
    await connection.execute('UPDATE users SET isAdmin = 1 WHERE id = ?', [user.id]);
    console.log(`✅ User ${user.id} (${user.email}) is now an admin!`);

    await connection.end();
    console.log('🎉 Admin setup completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error making admin:', error.message);
    console.error('   Make sure:');
    console.error('   1. Database is set up (run setup-database.js first)');
    console.error('   2. Environment variables are set correctly');
    console.error('   3. At least one user exists (register through API first)');
    process.exit(1);
  }
}

makeAdmin();
