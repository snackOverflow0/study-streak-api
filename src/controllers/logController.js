import pool from "../models/db.js"
import { calculateStreak } from "../services/streakService.js"

export const addLog = async (req, res) => {
  try {
    const { user_id, study_date, hours } = req.body
    
    // 1. Get user
    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [user_id]
    )

    const user = userResult.rows[0]

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // 2. Calculate new streak
    const newStreak = calculateStreak(user, study_date)

    // 3. Update longest streak
    const longestStreak = Math.max(newStreak, user.longest_streak)

    // 4. Insert log
    await pool.query(
      "INSERT INTO study_logs (user_id, study_date, hours) VALUES ($1, $2, $3)",
      [user_id, study_date, hours]
    )

    // 5. Update user streak
    await pool.query(
      `UPDATE users
      SET current_streak = $1,
          longest_streak = $2,
          last_study_date = $3
      WHERE id = $4`,
      [newStreak, longestStreak, study_date, user_id]
    )

    res.json({
      message: "Log added",
      current_streak: newStreak,
      longest_streak: longestStreak
    })

  } catch (err) {
    res.staus(500).json({ error: err.message })
  }
}

export const getLogs = async (req, res) => {
  try {
    const { userId } = req.params

    const result = await pool.query(
      "SELECT * FROM study_logs WHERE user_id = $1 ORDER BY study_date DESC",
      [userId]
    )

    res.json(result.rows)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}