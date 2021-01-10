import { useEffect, useState } from "react";

export default function useScrape() {
    const [scrapes, setScrapes] = useState();

    useEffect(() => {
        (async function() {
            const scrapeData = await fetch("http://localhost:2093/data");
            const scrapesJSON = await scrapeData.json();
            setScrapes(scrapesJSON);
        })();
    }, []);

    return scrapes;
}