import DiaryQuote, { currentQuote, currentAuthor } from '../components/DiaryQuote'
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
        diaryItems: [],
        trigger: 0,
        darkMode: localStorage.getItem('darkMode') === 'true'
    };
}

componentDidMount() {
    this.fetchEntries();
    if (this.state.darkMode) {
        document.body.classList.add('dark-mode');
    }
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

addNewItem = async (item) => {
    try {
        console.log("AB TO POST: " + JSON.stringify(item));

        const item_with_quote = {
            ...item,
            quote: currentQuote, 
            author: currentAuthor
        };

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        }

        console.log("payload: "+item_with_quote.quote+" author: "+item_with_quote.author); 

        const response = await axios.post('http://localhost:3001/diary', item_with_quote, config);
        console.log("RES: " + response);
        this.setState({ diaryItems: [response.data, ...this.state.diaryItems] });
        console.log("RES TEXT: "+JSON.stringify(response.data.text)); 
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

toggleDarkMode = () => {
    this.setState(prevState => {
        const newDarkMode = !prevState.darkMode;
        localStorage.setItem('darkMode', newDarkMode); 
        if (newDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        return { darkMode: newDarkMode };
    });
}

render() {
    const { show, activeItem, trigger, diaryItems, darkMode } = this.state;
    console.log(diaryItems);

    return (
        <div className={`grid-container ${darkMode ? 'dark-mode' : ''}`}>
            {/* Left card */}
            <div className='diary-app'>
                <h1>My Journal</h1>
                <div>
                    <DiaryQuote trigger={trigger}/>
                </div>
                <DiaryForm fetchEntries={this.fetchEntries} addItem={this.addNewItem} onNewEntry={() => { 
                    this.setState((prevState) => ({
                        trigger: prevState.trigger+1, 
                    })); 
                }}/>
                <div className="button-container">
                    <button onClick = {() => { 
                        this.setState((prevState) => ({
                            trigger: prevState.trigger+1, 
                        })); 
                    }} className = "generate-quote-button">
                        Generate New Quote
                    </button>
                    <button onClick={this.toggleDarkMode} className="dark-mode-button">
                            Toggle Dark Mode
                        </button>
                </div>
            </div>

            {/* Right card */}
            <div className='diary-app' style={{ paddingTop: 20 }}>
                {diaryItems.length > 0 ? (
                    diaryItems.map((item) => {
                        return (
                            <DiaryItem
                                deleteItem={this.deleteItem} 
                                showModal={() => this.setState({ show: true, activeItem: item })}
                                item={item}
                            />
                        )
                    })
                ) : <div>
                        <h1>No items</h1>
                        <p className="start-today">Start journaling today!</p>
                    </div>
                }
            </div>
            <div>
            {/* Large modal for entry info */}
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => this.setState({ show: false })}
                    aria-labelledby="example-modal-sizes-title-lg"
                    className={darkMode ? 'dark-mode' : ''}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {activeItem?.title}
                            <div class="diary-quote">"{activeItem?.quote}" -{activeItem?.author}</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{activeItem?.body}</Modal.Body>
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