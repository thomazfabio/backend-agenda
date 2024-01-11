// Get the client
const mysql = require('mysql2/promise');
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'agenda_qualitec',
    });
    console.log('Conectado ao MySQL');
    global.connection = connection;
    return connection;
}
connect();
module.exports = {connect};