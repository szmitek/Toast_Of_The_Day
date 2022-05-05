import React from 'react'
import PropTypes from "prop-types"
import { getFunName } from "../helpers.js"


class StorePicker extends React.Component {

    myInput = React.createRef();
    static propTypes = {
        history: PropTypes.object
    };

    goToStore = event => {
        event.preventDefault(); // stop form from submitting
        const storeName = this.myInput.current.value; // get the input from form
        this.props.history.push(`/store/${storeName}`); // change page to entered value
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a store</h2>
                <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} />
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

export default StorePicker