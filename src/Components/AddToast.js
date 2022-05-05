import React from "react"
import PropTypes from "prop-types";


class AddToast extends React.Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        addToast: PropTypes.func
    }

    createToast = (event) => {
        event.preventDefault(); //stop form from submitting
        const toast = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        };
        this.props.addToast(toast);
        event.currentTarget.reset(); //refresh the form
    }

    render() {
        return <div className="AddToast">
            <form className="toast-edit" onSubmit={this.createToast}>
               <input  name="name" ref={this.nameRef} type="text" placeholder="Name"/>
                <input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
                <select  name="status" ref={this.statusRef}>
                    <option value="available">Available</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
               <textarea  name="desc" ref={this.descRef} placeholder="Desc"/>
               <input  name="image" ref={this.imageRef} type="text" placeholder="Image"/>
                <button type="submit">+ Add Toast</button>
            </form>
        </div>
    }
}

export default AddToast