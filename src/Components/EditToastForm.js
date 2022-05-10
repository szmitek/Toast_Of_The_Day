import React from "react"
import PropTypes from "prop-types";


class EditToastForm extends React.Component {
    static propTypes = {
        toast: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateToast: PropTypes.func
    };
    handleChange = (event) => {
        const updatedToast = {...this.props.toast, [event.currentTarget.name]: event.currentTarget.value} //take a copy of current toast
        this.props.updateToast(this.props.index, updatedToast)
    }

    render() {
        return (
            <div className="toast-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.toast.name}/>
                <input type="text" name="price" onChange={this.handleChange} value={this.props.toast.price}/>
                <select name="status" onChange={this.handleChange} value={this.props.toast.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.toast.desc}/>
                <input type="text" name="image" onChange={this.handleChange} value={this.props.toast.image}/>
                <button onClick={() => this.props.deleteToast(this.props.index)}>Remove Toast</button>
            </div>
        );
    }
}

export default EditToastForm;