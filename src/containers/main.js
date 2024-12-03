import DiaryQuote from '../components/DiaryQuote'
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
            {/* Left card */}
            <div className='diary-app'>
                <h1>My Journal</h1>
                <div>
                    <DiaryQuote trigger={trigger}/>
                </div>
                <DiaryForm addItem={addItem} onNewEntry={this.handleNewEntry}
                />
                <div className="button-container">
                    <button onClick = {this.handleNewEntry} className = "generate-quote-button">Generate New Quote</button>
                </div>
            </div>

            {/* Right card */}
            <div className='diary-app' style={{ paddingTop: 20 }}>
                {diaryItems.length > 0 ? (
                    diaryItems.map((item) => {
                        return (
                            <DiaryItem
                                deleteItem={this.props.deleteItem} 
                                showModal={() => this.setState({ show: true, activeItem: item })}
                                key={item.id}
                                item={item}
                            />
                        )
                    })
                ) : <div>
                        <h1>No items</h1>
                        <p class="start-today">Start journaling today!</p>
                    </div>
                }
            </div>
            <div>
            {/* Large modal for entry info */}
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => this.setState({ show: false })}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {activeItem?.title}
                            <p>hello</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{activeItem?.text}</Modal.Body>
                    <Modal.Footer>
                        {activeItem?.date}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>   
        );
    }
}

export default Main;
