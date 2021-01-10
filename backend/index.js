import express from "express";
import cors from "cors";
import { getInstagramCount } from "./lib/scrapper";
import "./lib/cron";
import db from "./db";

const app = express();
app.use(cors());

app.get("/scrapper", async (req, res) => {
    try {
        console.log("Scrapping");
        const instagramCount = await getInstagramCount();
        res.json({ instagramCount });
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/data", async (req, res) => {
    const instagram = db.get("instagram").value();
    res.json({ instagram });
});

const server = app.listen(2093, () => {
    console.log(`App runnning on http://localhost:${server.address().port}`);
});
