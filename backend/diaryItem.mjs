import { db } from "./db.mjs";

export class DiaryItem {

    #id
    #date
    #title
    #text
    #quote
    #author
    
    static #next_id = 1;

    constructor(id, date, title, text, quote, author) {
        this.#id = id;
        this.#date = date;
        this.#title = title;
        this.#text = text;
        this.#quote = quote; 
        this.#author = author; 
    }

    static async create(data) {
        if ((data !== undefined) && (typeof data == 'object')
        && (data.title !== undefined) && (typeof data.title == 'string')
        && (data.text !== undefined) && (data.date !== undefined)) {
            try {
                let db_result = await db.run(
                    'INSERT INTO entries (date, title, body, quote, author) VALUES (?, ?, ?, ?, ?)', 
                    data.date, 
                    data.title, 
                    data.text, 
                    data.quote, 
                    data.author
                );
                let entry = new DiaryItem(db_result.lastId, data.date, data.title, data.text, data.quote, data.author);
                return entry;
            } catch (e) {
                console.log("ERROR: " + e);
                return [];
            }
        }
    
    }

    static async getAll() {
        try {
            let rows = await db.all('SELECT * from entries');
            return rows;
        } catch (e) {
            console.log(e);
            return [];
        }
    } 

    static async deleteEntryById(id) {
        if (id !== undefined) {
            try {
                await db.run('DELETE FROM entries where id = ?', id);
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        } 
        console.error("Invalid ID");
        return false;
    }

    json() {
        return {
            id: this.#id,
            date: this.#date,
            title: this.#title,
            text: this.#text, 
            quote: this.#quote,
            author: this.#author 
        }
    }
}