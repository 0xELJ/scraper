import axios from "axios";
import cheerio from "cheerio";
import db from "../db";

export async function getHTML(url, headers = {}) {
    const { data: html } = await axios.get(url, { headers });
    return html;
}

export async function getTwitterFolllowers() {
    const $ = cheerio.load(html);
    const span = $('[data-nav="followers"] .ProfileNav-value');
    return span.data('count');
}

export async function getInstagramFollowers(html) {
    const $ = cheerio.load(html);
    const pageJSON = $('script[type="application/ld+json"]').html();
    const pageObject = JSON.parse(pageJSON);
    const countInString = pageObject.mainEntityofPage.interactionStatistic.userInteractionCount;
    return parseInt(countInString);
}

export async function getTwitterCount() {
    const html = await getHTML('https://twitter.com/wesbos');
    const twCount = await getTwitterFolllowers(html);
    return twCount;
}

export async function getInstagramCount() {
    const html = await getHTML('https://instagram.com/wesbos');
    const instagramCount = await getInstagramFollowers(html);
    return instagramCount;
}

export async function runCron() {
    const instagramCount = await getInstagramCount();
    console.log({ instagramCount });
    db.get("instagram")
        .push({ date: Date.now(), count: instagramCount })
        .write();
    console.log("DONE!");
}