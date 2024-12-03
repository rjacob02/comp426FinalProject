import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            } catch (error) {
                console.error("Error fetching quote:", error);
                setQuote("Failed to fetch quote"); 
            }
        };

        fetchQuote();
    }, [trigger]); 

    return (
        <div className="diary-quote">
            <p value = {quote}>"{quote}"</p> 
            <p value = {author}>- {author}</p>
        </div>
    );
}
