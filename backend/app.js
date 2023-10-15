import cheerio from "cheerio";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.listen(4000);
app.use(cors());

const getWord = async () => {
  try {
    const response = await fetch(
      "https://www.phonemicchart.com/transcribe/biglist.html"
    );

    const body = await response.text();
    const $ = cheerio.load(body);

    let arr = [];
    $(".main > a").map((i, el) => {
      arr.push($(el).text());
    });

    return arr;
  } catch (error) {
    console.log(error);
  }
};

app.get("/word", async (req, res) => {
  try {
    const arr = await getWord();
    const word = arr[Math.floor(Math.random() * arr.length)];
    const response = await fetch(
      `https://www.phonemicchart.com/transcribe/?w=${word}`
    );
    const body = await response.text();
    const $ = cheerio.load(body);
    const transcription = $(".H4").text();
    res.json({ word: word.toLowerCase(), transcription });
  } catch (error) {
    console.log(error);
  }
});
