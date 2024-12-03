import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DiaryForm from '../components/DiaryForm';
import DiaryItem from '../components/DiaryItem';
import { Modal } from 'react-bootstrap';

export class Main extends Component {
    static propTypes = {
    diaryItems: PropTypes.array
}

constructor() {
    super();
    this.state = {
        show: false,
        activeItem: null,
        diaryItems: []
    };
}

componentDidMount() {
    this.fetchEntries();
}

fetchEntries = async () => {
    console.log('hello');
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
    try {
        const response = await axios.get('http://localhost:3001/diary', config);
        console.log("this is the response :)" + response);
        this.setState({ diaryItems: response.data });
    } catch (e) {
        console.error("this is the error :(" + e);
    }
}

addItem = async (item) => {
    try {
        console.log("AB TO POST: " + JSON.stringify(item));
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        }
        const response = await axios.post('http://localhost:3001/diary', item, config);
        console.log("RES" + response);
        this.setState({ diaryItems: [response.data, ...this.state.diaryItems] });
    } catch (e) {
        console.error(e);
    }
    
}

deleteItem = async (id) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
    await axios.delete(`http://localhost:3001/diary/${id}`, config);
    this.setState({ diaryItems: this.state.diaryItems.filter(item => item.id !== id) });
}

render() {
    const { diaryItems, show } = this.state;

    return (
       <div>
        <div className='grid-container'>
            <div className='diary-app'>
                <h1>Benny's Journal</h1>
                    <DiaryForm addItem={this.addItem} />
                        </div>
                            <div className='diary-app' style={{ paddingTop: 20 }}>
                                {diaryItems.map(item => (
                                <DiaryItem key={item._id} item={item} deleteItem={this.deleteItem} />
                                ))}
                            </div>
                        </div>
                    <Modal show={show} onHide={() => this.setState({ show: false })}>
                        {/* Modal content */}
                    </Modal>
                </div>
        );

    }
}

export default Main;