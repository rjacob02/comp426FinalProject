import React, { useState, useEffect } from 'react';
import axios from 'axios';

let currentQuote = "no quote yet"; 
let currentAuthor = "Anonymous"; 

export default function DiaryQuote({ trigger }) {
    const [quote, setQuote] = useState("Loading..."); 
    const [author, setAuthor] = useState(""); 

    useEffect(() => {

        const fetchQuote = async () => {
            try {
                const config = {
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    }
                  };
                const response = await axios.get('https://quotes-api-self.vercel.app/quote', config);
                const data = response.data;
                setQuote(data.quote || "Default quote"); 
                setAuthor(data.author || "Anonomous"); 
                currentQuote = data.quote || "Default quote";
                currentAuthor = data.author || "Anonymous"; 
            } catch (error) {
                console.error("Error fetching quote:", error);
                setQuote("Failed to fetch quote"); 
            }
        };

        fetchQuote();
    }, [trigger]); 

    return (
        <div className="diary-quote">
            <p>"{quote}"</p> 
            <p>- {author}</p>
        </div>
    );
}

export { currentQuote, currentAuthor }; 
