import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", require("./routes/auth"));
app.use(cors());

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});