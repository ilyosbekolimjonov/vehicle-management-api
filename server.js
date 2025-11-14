import express from "express"
import dotenv from "dotenv"
import db from "./src/db/knex.js"

dotenv.config()

const app = express()
app.use(express.json())

// test route
// app.get("/users", async (req, res) => {
//     try {
//         const users = await db("users").select("*")
//         res.json(users)
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ error: "Server error" })
//     }
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})