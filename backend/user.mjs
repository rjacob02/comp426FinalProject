export class User {

    #id
    #name
    
    static #next_id = 1;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    static create(data) {
        // validate parameter, 
        // call constructor, 
        // add user to all users
        // return user
    }

    static getAllIds() {

    }

    static findByID(id) {

    }

    json() {
        return {
            id: this.#id,
            name: this.#name
        }
    }
}