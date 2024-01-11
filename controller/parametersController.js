const db = require('../db/db.js');

exports.getParameters = async (req, res) => {
    const conn = await db.connect();
    try {
        const [results] = await conn.query('SELECT * FROM date_parameters');
        console.log(results);
        res.json({ mensagem: 'parametros obtidos', parametros: results });
    } catch (err) {
        console.error('Erro ao obter parâmetros:', err);
        res.status(500).json({ mensagem: 'Erro ao obter parâmetros' });
    }
};

exports.setParameters = async (req, res) => {
    const conn = await db.connect();
    try {
        // Dados a serem inseridos
        const parameters = {
            name: 'geral',
            start_date: 3,
            end_date: 5,
        };

        // Consulta SQL com placeholders
        const sql = 'INSERT INTO date_parameters SET ?';

        // Executa a consulta com os dados como placeholders
        const [results] = await conn.query(sql, parameters);

        console.log('Inserção bem-sucedida!');
        console.log('ID do novo parâmetro:', results.insertId);

        res.json({ mensagem: 'parâmetros setados', novoParametro: results });
    } catch (error) {
        console.error('Erro ao inserir parâmetros:', error);
        res.status(500).json({ mensagem: 'Erro ao inserir parâmetros' });
    }
};
