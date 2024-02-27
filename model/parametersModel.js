const db = require('../db/db.js');
const { updateDataTableById } = require('../model/querys.js')

// Dados a serem inseridos
const data = {
    name: null,
    start_date: null,
    end_date: null
};

// obter
async function getParameters() {

    const conn = await db.connect();

    try {
        const [results] = await conn.query('SELECT * FROM date_parameters');
        return results;
    } catch (err) {
        return err
    }
}

// adicionar 
async function setParameters(dataSet) {

    Object.assign(data, dataSet);

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

async function updateParametersById(table, id, newData) {

    try {
        const query = await updateDataTableById(table, id, newData)
        return query
    } catch (error) {
        return error
    }
}

exports.getParameters = getParameters;
exports.setParameters = setParameters;
exports.updateParametersById = updateParametersById;