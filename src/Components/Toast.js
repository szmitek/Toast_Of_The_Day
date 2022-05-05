import React from "react";
import {formatPrice} from "../helpers";

class Toast extends React.Component {
    render() {
        const {image, name, price, desc, status} = this.props.details
        return (
            <li className="menu-toast">
                <img src={image} alt={name}/>
                <h3 className="toast-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button>Add to cart</button>
            </li>
        );
    }
}

export default Toast;