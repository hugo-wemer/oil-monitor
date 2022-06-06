const sql = require('mssql')

async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('./teste.db')
        const result = await sql.query`select * from main`
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
}