const mysql = require('mysql2/promise');


  // Método responsável por realizar a conexão com o banco de dados
async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: 'sql209.byetcluster.com',
      user: 'if0_34864425',
      password: 'annadjulia4815162342',
      database: 'if0_34864425_tarefas_sites'
    });
    console.log('Conexão estabelecida com sucesso');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}
// Método responsável por executar uma query no banco de dados
async function query(sql) {
  const connection = await connect();
  try {
    
    const [rows, fields] = await connection.execute(sql);
    console.log('Query executada com sucesso');
    return rows;
  } catch (error) {
    console.error('Erro ao executar a query:', error);
    throw error;
  } finally {
    if (connection) {
        connection.end(); // Fechando a conexão após a execução da query
        console.log('Conexão encerrada');
    }
  }
}


module.exports = {query};