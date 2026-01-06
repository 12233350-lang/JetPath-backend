const mysql = require('mysql2/promise');

async function makeAdmin() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD_HERE',
    database: 'jetpath'
  });
  
  await connection.execute('UPDATE users SET isAdmin = 1 WHERE id = 1');
  console.log('User 1 is now admin!');
  await connection.end();
}

makeAdmin();
