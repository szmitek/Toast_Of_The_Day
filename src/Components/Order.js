import React from "react"
import {formatPrice} from "../helpers";
import PropTypes from "prop-types";
import {TransitionGroup, CSSTransition} from "react-transition-group";

class Order extends React.Component {
    static propTypes = {
        toasts: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }
    renderOrder = key => {
        const toast = this.props.toasts[key];
        const count = this.props.order[key];
        const isAvailable = toast && toast.status === "available";
        const transitionOptions = {
            classname: "order",
            key,
            timeout: {enter: 500, exit: 500}
        };

        if (!toast) return null;

        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry {toast ? toast.name : "toast"} is no longer available
                    </li>
                </CSSTransition>
            );
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {toast.name}
                        {formatPrice(count * toast.price)}
                        <button onClick={() => this.props.removeFromOrder(key)}>
                            &times;
                        </button>
                    </span>
                </li>
            </CSSTransition>
        )
    }

    render() {
        const orderIds = Object.keys(this.props.order)
        const total = orderIds.reduce((prevTotal, key) => {
            const toast = this.props.toasts[key];
            const count = this.props.order[key];
            const isAvailable = toast && toast.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * toast.price)
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order!!!</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;