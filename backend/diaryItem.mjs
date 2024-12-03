import { db } from "./db.mjs";

export class DiaryItem {

    #id
    #date
    #title
    #body
    
    static #next_id = 1;

    constructor(id, date, title, body) {
        this.#id = id;
        this.#date = date;
        this.#title = title;
        this.#body = body;
    }

    static async create(data) {
        if ((data !== undefined) && (data instanceof Object)
        && (data.title !== undefined) && (typeof data.title == 'string')
        && (data.body !== undefined) && (data.date !== undefined)) {
            try {
                let db_result = await db.run(
                    'INSERT INTO entries (date, title, body) VALUES (?, ?, ?)', 
                    data.date, 
                    data.title, 
                    data.body
                );
                let entry = new DiaryItem(db_result.lastId, data.date, data.title, data.body);
                return entry;
            } catch (e) {
                console.log(e);
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

    json() {
        return {
            id: this.#id,
            date: this.#date,
            title: this.#title,
            body: this.#body
        }
    }
}