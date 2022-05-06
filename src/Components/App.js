import React from "react"
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleToasts from "../sample-toasts";
import Toast from "./Toast";
import PropTypes from "prop-types";
import base from "../base";

class App extends React.Component {
    state = {
        toasts: {},
        order: {}
    };
    static propTypes = {
        match: PropTypes.object
    };
    componentDidMount() {
        const {params} = this.props.match
        const localStorageRef = localStorage.getItem(params.storeId)
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/toasts`, {
            context: this,
            state: 'toasts'
        })
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    addToast = (toast) => {
        const toasts = { ...this.state.toasts } //take a copy of existing state
        toasts[`toast${Date.now()}`] = toast; //add new toast to toasts variable
        this.setState({ toasts }) //set new toasts object to state
    }
    loadSampleToasts = () => {
        this.setState({ toasts: sampleToasts })
    }
    addToOrder = (key) => {
        const order = { ...this.state.order }; //take a copy of state
        order[key] = order[key] + 1 || 1; // add to order or update amount
        this.setState({ order });
    }

    render() {
        return (
            <div className="toast-of-the-day">
                <div className="menu">
                    <Header tagline="Toast market"></Header>
                    <ul className="toasts">
                        {Object.keys(this.state.toasts).map(key => (
                            <Toast key={key} index={key} details={this.state.toasts[key]} addToOrder={this.addToOrder} />
                                ))}
                    </ul>
                </div>
                <Order
                    toasts={this.state.toasts}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                ></Order>
                <Inventory
                    addToast={this.addToast}
                    updateToast={this.updateToast}
                    deleteToast={this.deleteToast}
                    loadSampleToasts={this.loadSampleToasts}
                    toasts={this.state.toasts}
                    storeId={this.props.match.params.storeId}></Inventory>
            </div>
        )
    }
}

export default App;