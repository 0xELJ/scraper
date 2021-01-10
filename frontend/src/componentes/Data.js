import { useContext } from "react";
import { ScrapeContext } from "./ScrapeContext";
import { formatDistanceToNow } from "date-fns";

export default function Data() {
    const scrapes = useContext(ScrapeContext);
    
    return (
        <div>
            <h2>YOUR DATA</h2>
            <ul>
                {scrapes?.instagram?.length && scrapes.instagram.map(scrape => (
                    <li key={scrape.date}>
                        {scrape.count}
                        {" - "}
                        {formatDistanceToNow(new Date(scrape.date), new Date())}
                    </li>
                ))}
            </ul>
        </div>
    );
}