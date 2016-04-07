import React from 'react';
import {Button, ButtonInput, Input, Form} from "react-bootstrap";

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Queue />
            </div>
        );
    }
});

var queueObj;

var Queue = React.createClass({

    initialize() {
        queueObj = [];
    },

    enqueue(elem) {
        if (typeof queueObj === 'undefined') {
            this.initialize();
        }
        if (typeof elem.elem != 'undefined') {
            queueObj.push(elem.elem);
            alert('enqueue  ' + queueObj);
        }
        else {
            alert('Element does not exist');
        }
    },

    dequeue(event) {
        event.preventDefault();
        if (queueObj.length > 0) {
            alert('dequeue  ' + queueObj);
            return queueObj.shift();
        }
        else {
            alert('no elements to dequeue');
        }
    },

    get(elem) {
        if (typeof queueObj[elem.elem] != 'undefined') {
            alert('give:  ' + queueObj[elem.elem]);
            return queueObj[elem.elem];
        }
        else {
            alert('element does not exist');
        }
    },

    reverse(event) {
        event.preventDefault();
        queueObj.reverse();
        alert('reversed queue:  ' + queueObj);
        return queueObj;
    },

    render() {
        if (typeof queueObj === 'undefined') {
            this.initialize();
        }
        return (
            <div>
                <AddElem onButtonClicked={this.enqueue} buttonValue="Enqueue"/>
                <DisplayQueue getQueue={queueObj}/>
                <ButtonInput type="button"
                             value="Dequeue"
                             bsSize="small"
                             onClick={this.dequeue} />
                <ButtonInput type="button"
                             value="Reverse"
                             bsSize="small"
                             onClick={this.reverse} />
                <AddElem onButtonClicked={this.get} buttonValue="Get Element"/>
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
        let length = value.length;
        let style = 'danger';

        if (length > 0) style = 'success';

        let disabled = style !== 'success';

        return { style, disabled };
    },

    handleChange(event) {
        this.setState( this.validationState(event.target.value) );
        this.setState({elem: event.target.value});
    },

    handleSubmit(event) {
        event.preventDefault();
        //var task = this.state.elem;
        this.props.onButtonClicked({elem: this.state.elem});
        this.setState({elem: ''});
        this.setState({value: ''});
    },

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Input type="Add New Element" ref="input" value={this.state.elem} onChange={this.handleChange} />
                <ButtonInput type="submit" value={this.props.buttonValue} bsStyle={this.state.style} bsSize="small" disabled={this.state.disabled}/>
                <div> Value: {this.state.elem} </div>
            </form>
        );
    }
});

var DisplayQueue = React.createClass({

    render() {
        var queueList = this.props.getQueue.map(function(elem){
                        return (
                            <Button value={elem} />
                        );
                    });
        return (
            <div> {queueList} </div>
        );
    }
})

export default App;
