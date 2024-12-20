const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "testdb",
    port: 5432
});

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.send(`Server time is: ${result.rows[0].now}`);
    } catch (err) {
        res.status(500).send("Database error");
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));