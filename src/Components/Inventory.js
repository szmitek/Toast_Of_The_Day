import React from "react"
import AddToast from "./AddToast";

class Inventory extends React.Component {
    render() {
        return <div className="inventory">
            <h2>Inventory</h2>
            <AddToast addToast={this.props.addToast} />
            <button onClick={this.props.loadSampleToasts}>Load sample toasts</button>
        </div>
    }
}

export default Inventory