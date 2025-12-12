const pool = require('../config/db')



const OrganizationModel = {
    async findAll() {
        const result = await pool.query('SELECT * FROM organizations')
        return result.rows
    },

    async create(name, sector, ownerId) {
        const result = await pool.query('INSERT INTO organizations (name, sector, ownerId) VALUES ($1, $2, $3) RETURNING *', [name, sector, ownerId])
        return result.rows[0]
    }
}


module.exports = OrganizationModel