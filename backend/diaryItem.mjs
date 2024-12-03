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

    static create(data) {
        if ((data !== undefined) && (data instanceof Object)
        && (data.title !== undefined) && (typeof data.title == 'string')
        && (data.body !== undefined) && (data.date !== undefined)) {
            let id = DiaryItem.#next_id++;

            let item = new DiaryItem(id, data.date, data.title, data.body);

            // add user to all users
            // return user
        }
        

    }

    static getAllIds() {
        
    }

    static findByID(id) {

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