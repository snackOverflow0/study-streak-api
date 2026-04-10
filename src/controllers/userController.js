import pool from "../models/db.js"

export const createUser = async (req, res) => {
  try {
    const { name } = req.body

    const result = await pool.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [name]
    )

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.query

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    )

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}