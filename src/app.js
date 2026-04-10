import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import logRoutes from "./routes/logRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", userRoutes)
app.use("/logs", logRoutes)

app.get("/", (req, res) => {
  res.send("Study streak API is running...")
})

export default app