import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DiaryForm from '../components/DiaryForm'
import DiaryItem from '../components/DiaryItem'
import DiaryQuote from '../components/DiaryQuote'
import { connect } from 'react-redux'
import { addItem, deleteItem } from '../redux/actions'
import { Modal } from 'react-bootstrap'

export class main extends Component {
    static propTypes = {
        addItem: PropTypes.func.isRequired,
        diaryItems: PropTypes.array.isRequired
    }

    constructor() {
        super()
        this.state = {
            show: false,
            activeItem: null,
            trigger: 0,
        };
    }

    handleNewEntry = () => {
        this.setState((prevState) => ({
            trigger: prevState.trigger+1, 
        })); 
    }; 

    render() {

        const { addItem, diaryItems } = this.props;
        const { show, activeItem, trigger } = this.state;

        return (
            <div>
                <div className='grid-container'>

                    {/* Left card */}
                    <div className='diary-app'>
                        <h1>My Journal</h1>
                        <div>
                            <DiaryQuote trigger={trigger}/>
                        </div>
                        <DiaryForm addItem={addItem} onNewEntry={this.handleNewEntry}
                        />
                        <button
                        onClick = {this.handleNewEntry}
                        className = "generate-quote-button"
                        >Generate New Quote
                        </button>
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
                        ) : <h1>No items</h1>}
                    </div>

                </div>

                {/* Large modal for entry info */}
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => this.setState({ show: false })}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {activeItem?.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{activeItem?.text}</Modal.Body>
                    <Modal.Footer>
                        {activeItem?.date}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    diaryItems: state.diaryItems
})

const mapDispatchToProps = (dispatch) => ({

    addItem: (item) => dispatch(addItem(item)),
    deleteItem: (id) => dispatch(deleteItem(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(main)
