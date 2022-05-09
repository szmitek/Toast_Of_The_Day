import React from "react"
import AddToast from "./AddToast";
import EditToastForm from "./EditToastForm";

class Inventory extends React.Component {
    render() {
        return <div className="inventory">
            <h2>Inventory</h2>
            {Object.keys(this.props.toasts).map(key => <EditToastForm key={key} index={key} toast={this.props.toasts[key]} updateToast={this.props.updateToast} />)}
            <AddToast addToast={this.props.addToast} />
            <button onClick={this.props.loadSampleToasts}>Load sample toasts</button>
        </div>
    }
}

export default Inventory