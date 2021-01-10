import { useContext } from "react";
import useScrape from "../hooks/useScrape";
import { ScrapeProvider } from "./ScrapeContext";

export default function Page({ children }) {
    const scrapes = useScrape();

    return (
        <ScrapeProvider value={scrapes}>
            <div className="page">
                {children}
            </div>
        </ScrapeProvider>
    );
}