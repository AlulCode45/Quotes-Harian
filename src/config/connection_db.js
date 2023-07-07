const dbConnect = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'quotes-harian'
    }
})


const checkConnect = () => {
    dbConnect.raw("SELECT 1")
        .then(() => {
            return true
        })
        .catch(() => {
            return false;
        });
}

module.exports = {
    dbConnect,
    checkConnect
}