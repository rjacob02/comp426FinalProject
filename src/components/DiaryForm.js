import React, { useState } from 'react';

export default function DiaryForm({ addItem, onNewEntry }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [text, setText] = useState(""); 
  
    const onSubmit = (event) => {
        event.preventDefault(); 

        const itemObject = {
            title: title,
            date: date,
            text: text
        };

        addItem(itemObject);

        setTitle(""); 
        setDate(""); 
        setText(""); 

        onNewEntry(); 
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='diary-form'>
                    <input
                        value = {title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder='Entry Title'
                        className='diary-input'
                    />
                    <input
                        value = {date}
                        onChange={(event) => setDate(event.target.value)}
                        type='date'
                        className='diary-date-input'
                    />
                </div>

                <textarea
                    value = {text}
                    onChange={(event) => setText(event.target.value)}
                    rows="2"
                    placeholder='Start typing here...'
                    className='diary-textarea'
                />

                <button type='submit' className='diary-button'>Add Entry to Diary</button>
            </form>
        </div>
    );
}
