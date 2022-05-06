import React from "react";
import {formatPrice} from "../helpers";
import PropTypes from "prop-types";

class Toast extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func,
        index: PropTypes.string
    };
    render() {
        const {image, name, price, desc, status} = this.props.details
        const isAvailable = status === "available"
        return (
            <li className="menu-toast">
                <img src={image} alt={name}/>
                <h3 className="toast-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}> {isAvailable ? 'Add to cart' : 'Sold Out!'}</button>
            </li>
        );
    }
}

export default Toast;