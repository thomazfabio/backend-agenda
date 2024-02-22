const db = require('../db/db.js');
// Dados a serem inseridos
const data = {
    name: 'geral',
    start_date: 3,
    end_date: 5,
};


async function getParameters() {
    const conn = await db.connect();
    try {
        const [results] = await conn.query('SELECT * FROM date_parameters');
        return results;
    } catch (err) {
        return err
    }
}

async function setParameters() {
    const conn = await db.connect();
    try {
        // Consulta SQL com placeholders
        const sql = 'INSERT INTO date_parameters SET ?';
        // Executa a consulta com os dados como placeholders
        const [results] = await conn.query(sql, data);
        console.log('Inserção bem-sucedida!');
        console.log('ID do novo parâmetro:', results.insertId);
        return results.insertId;
    } catch (error) {
        return error;
    }
}

exports.getParameters = getParameters;
exports.setParameters = setParameters;