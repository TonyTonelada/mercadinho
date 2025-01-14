import mysql from 'mysql2/promise';

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'paodebatata',
  database: 'mercadinho',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
