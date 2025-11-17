import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import router from "./src/routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})