import { db } from "./db.mjs";

export class User {

    #id
    #name
    
    static #next_id = 1;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    static async create(data) {
        if ((data !== undefined) && (data instanceof Object)
        && (data.name !== undefined) && (typeof data.name == 'string')) {
            try {
                let db_result = await db.run(
                    'INSERT INTO users (name) VALUES (?)', 
                    data.name
                );
                let user = new User(db_result.lastId, data.name);
            return user;
            } catch (e) {
                console.log(e);
                return [];
            }
        }
    }

    static async getAll() {
        //return from the database all the users.
        try {
            let rows = await db.all('SELECT * from users');
            return rows;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    static async findByID(id) {
        //return from the database the user with the given id.
        try {
            let row = await db.get('SELECT * from users WHERE id = ?', id);
            return row;
        } catch (e) {
            console.log(e);
            return [];
        }

    }

    json() {
        return {
            id: this.#id,
            name: this.#name
        }
    }
}