const db = require('../db/db.js');

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

//Update
async function updateParameters(id, newData) {
    // Conecta ao banco de dados
    const conn = await db.connect();

    try {
        // Consulta SQL para recuperar os dados existentes
        const selectQuery = 'SELECT * FROM date_parameters WHERE id = ?';
        const [rows] = await conn.query(selectQuery, id);

        // Verifica se o parâmetro com o ID especificado existe
        if (rows.length === 0) {
            return 'Parâmetro não encontrado';
        }

        // Extrai os dados existentes do banco de dados
        const existingData = rows[0];

        // Verifica quais campos foram alterados
        const updatedData = {};
        for (const key in newData) {
            if (existingData[key] !== newData[key]) {
                updatedData[key] = newData[key];
            }
        }

        // Se não houver campos alterados, retorna sem executar a atualização
        if (Object.keys(updatedData).length === 0) {
            return 'Nenhum dado alterado';
        }

        // Atualiza apenas os campos alterados no banco de dados
        const updateQuery = 'UPDATE date_parameters SET ? WHERE id = ?';
        await conn.query(updateQuery, [updatedData, id]);

        console.log('Atualização bem-sucedida!');
        return 'Atualização bem-sucedida';
    } catch (error) {
        return error;
    }
}

exports.getParameters = getParameters;
exports.setParameters = setParameters;
exports.updateParameters = updateParameters;