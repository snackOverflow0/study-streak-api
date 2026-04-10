import { Router } from "express"
import { addLog, getLogs } from "../controllers/logController.js"

const router = Router()

router.post("/", addLog)
router.get("/:userId", getLogs)

export default router