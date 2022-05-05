import React from "react"
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleToasts from "../sample-toasts";
import Toast from "./Toast";

class App extends React.Component {
    state = {
        toasts: {},
        order: {}
    };
    addToast = (toast) => {
        const toasts = { ...this.state.toasts } //take a copy of existing state
        toasts[`toast${Date.now()}`] = toast; //add new toast to toasts variable
        this.setState({ toasts }) //set new toasts object to state
    }
    loadSampleToasts = () => {
        this.setState({ toasts: sampleToasts })
    }

    render() {
        return (
            <div className="toast-of-the-day">
                <div className="menu">
                    <Header tagline="Toast market"></Header>
                    <ul className="toasts">
                        {Object.keys(this.state.toasts).map(key =><Toast key={key} details={this.state.toasts[key]}>{key}</Toast>)}
                    </ul>
                </div>
                <Order></Order>
                <Inventory addToast={this.addToast} loadSampleToasts={this.loadSampleToasts}></Inventory>
            </div>
        )
    }
}

export default App;