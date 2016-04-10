import React from 'react';
import {Button, ButtonInput, Input, Form, ButtonToolbar} from "react-bootstrap";

var App = React.createClass({

    handleChange(event) {
        alert('change');
        this.setState( this.validationState(event.target.value) );
        this.setState({elem: event.target.value});
    },

    render() {
        return (
            <div>
                <Queue />
                <div onChange={this.handleChange}> {queueObj} </div>
            </div>
        );
    }
});

var queueObj;
var lastObj;

var Queue = React.createClass({

    initialize() {
        queueObj = [];
    },

    enqueue(elem) {
        if (typeof queueObj === 'undefined') {
            this.initialize();
        }
        if (typeof elem.elem != 'undefined' && elem.elem != null) {
            queueObj.push(elem.elem);
            this.handleChange(queueObj);
        }
        else {
            alert('Element does not exist');
        }
    },

    //dequeues first element, shifting the rest of the array
    dequeue(event) {
        event.preventDefault();
        let length = queueObj.length;
        if (length > 0) {
            lastObj = queueObj[0];
            this.setState({lastObj: lastObj});

            for(var i = 0; i < length-1; i++) {
                queueObj[i] = queueObj[i+1];
            };
            queueObj.splice(length-1, 1);
            this.handleChange(queueObj);
        }
        else {
            alert('no elements to dequeue');
        }
    },

    peek(elem) {
        if (typeof queueObj[elem.elem] != 'undefined') {
            alert('give:  ' + queueObj[elem.elem]);
            return queueObj[elem.elem];
        }
        else {
            alert('element does not exist');
        }
    },

    // On the event of a button push, reverse the array element
    reverse(event) {
        event.preventDefault();
        var temp;
        let length = queueObj.length;
        var limit;

        //Only reverse if long enough
        if (length > 1) {
            //If Even, flip pairs; If Odd, flip pairs around center
            if (length % 2 === 0) {
                limit = length/2;
            }
            else {
                limit = length/2 - 1;
            }

            //Iterate halfway through and swap
            for (var i = 0; i < limit; i++) {
                temp = queueObj[i];
                queueObj[i] = queueObj[length-1-i];
                queueObj[length-1-i] = temp;
            };
        }

        //Update display
        this.handleChange(queueObj);
    },

    //Update the value of QueueObj for the display
    handleChange(queue) {
        this.setState({queueObj: queue});
    },

    render() {
        if (typeof queueObj === 'undefined') {
            this.initialize();
        }
        return (
            <div>
                <AddElem onButtonClicked={this.enqueue} buttonValue="Enqueue"/>
                <ButtonInput
                    type="button"
                    value="Dequeue"
                    bsSize="small"
                    onClick={this.dequeue} />
                <DisplayQueue getQueue={queueObj}/>
                <div>
                    Dequeued: <ButtonInput value={lastObj} />
                </div>
                <ButtonInput
                    type="button"
                    value="Reverse"
                    bsSize="small"
                    onClick={this.reverse} />
                <AddElem
                    onButtonClicked={this.peek}
                    buttonValue="Get Element"/>
            </div>
        );
    }
});

var AddElem = React.createClass({
    getInitialState() {
        return {
            disabled: true,
            style: null
        };
    },

    validationState(value) {
        let style = 'danger';
        if (typeof value !== 'undefined') {
            let length = value.length;

            if (length > 0) style = 'success';
        }

        let disabled = style !== 'success';

        return { style, disabled };
    },

    handleChange(event) {
        this.setState( this.validationState(event.target.value) );
        this.setState({elem: event.target.value});
    },

    handleSubmit(event) {
        event.preventDefault();
        this.props.onButtonClicked({elem: this.state.elem});
        this.setState({elem: ''});
        this.setState({value: ''});
        this.setState( this.validationState(event.target.value) );
    },

    render() {
        const subButton = <ButtonInput type="submit" value={this.props.buttonValue} bsStyle={this.state.style} bsSize="small" disabled={this.state.disabled}/>;

        return (
            <form onSubmit={this.handleSubmit}>
                <Input
                    type="Add New Element"
                    ref="input"
                    value={this.state.elem}
                    onChange={this.handleChange}
                    buttonBefore={subButton}/>
            </form>
        );
    }
});

var DisplayQueue = React.createClass({

    render() {
        var queueList = this.props.getQueue.map(function(elem){
                        return (
                            <Button> {elem} </Button>
                        );
                    });
        return (
            <ButtonToolbar> {queueList} </ButtonToolbar>
        );
    }
});

export default App;
