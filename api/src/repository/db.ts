import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'paodebatata',
  database: 'mercadinho',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 20
});

export const loadDump = async () => {
  const dumpPath = path.join(__dirname, 'dump.sql');
  const dumpSql = fs.readFileSync(dumpPath, 'utf-8');
  const connection = await pool.getConnection();
  try {
    await connection.query(dumpSql);
    console.log('Database dump loaded successfully');
  } catch (error) {
    console.error('Error loading database dump:', error);
  } finally {
    connection.release();
  }
};

export default pool;
