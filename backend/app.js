import cheerio from "cheerio";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs";

const app = express();
app.listen(4000);
app.use(cors());

const getWord = () => {
  // try {
  //   const response = await fetch(
  //     "https://www.phonemicchart.com/transcribe/biglist.html"
  //   );

  //   const body = await response.text();
  //   const $ = cheerio.load(body);

  //   let arr = [];
  //   $(".main > a").map((i, el) => {
  //     arr.push($(el).text());
  //   });

  //   return arr;
  // } catch (error) {
  //   console.log(error);
  // }

  const data = fs.readFileSync("./wordlist.txt").toString().split(", ");
  return data.filter((w) => w != "");
};

app.get("/word", async (req, res) => {
  try {
    const arr = getWord();
    const today = new Date();
    const day = today.getDate();
    const word = arr[day % arr.length];
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
