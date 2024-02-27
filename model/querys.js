const db = require('../db/db.js');

//Update
async function updateDataTableById(table, id, newData) {
    // Conecta ao banco de dados
    const conn = await db.connect();

    try {
        // Consulta SQL para recuperar os dados existentes
        const selectQuery = `SELECT * FROM ${table} WHERE id = ?`;
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
        const updateQuery = `UPDATE ${table} SET ? WHERE id = ?`;
        await conn.query(updateQuery, [updatedData, id]);

        console.log('Atualização bem-sucedida!');
        return 'Atualização bem-sucedida';
    } catch (error) {
        return error;
    }
}

exports.updateDataTableById = updateDataTableById