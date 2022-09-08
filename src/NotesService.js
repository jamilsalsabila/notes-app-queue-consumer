const { Pool } = require("pg");

class NotesService {
    constructor() {
        this._pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            port: process.env.PGPORT,
        });
    }

    async getNotes(userId) {
        const query = {
            text: `
            SELECT
                notes.*
            FROM
                notes
            LEFT JOIN
                collaborations
            ON
                collaborations.note_id = notes.id
            WHERE
                notes.owner = $1 OR collaborations.user_id = $1
            GROUP BY
                notes.id
            `,
            values: [userId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = NotesService;