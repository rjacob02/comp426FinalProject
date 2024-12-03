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
    const response = await axios.get('http://localhost:3001/diary');
    this.setState({ diaryItems: response.data });
}

addItem = async (item) => {
    const response = await axios.post('http://localhost:3001/diary', item);
    this.setState({ diaryItems: [response.data, ...this.state.diaryItems] });
}

deleteItem = async (id) => {
    await axios.delete(`http://localhost:3001/diary/${id}`);
    this.setState({ diaryItems: this.state.diaryItems.filter(item => item._id !== id) });
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