import React from "react"
import AddToast from "./AddToast";
import EditToastForm from "./EditToastForm";
import PropTypes from "prop-types";

class Inventory extends React.Component {
    static propTypes = {
        toasts: PropTypes.object,
        updateToast: PropTypes.func,
        deleteToast: PropTypes.func,
        loadSampleToast: PropTypes.func,
        addToast: PropTypes.func
    };
    render() {
        return <div className="inventory">
            <h2>Inventory</h2>
            {Object.keys(this.props.toasts).map(key => (<EditToastForm key={key} index={key} toast={this.props.toasts[key]} updateToast={this.props.updateToast} deleteToast={this.props.deleteToast}/>))}
            <AddToast addToast={this.props.addToast} />
            <button onClick={this.props.loadSampleToasts}>Load sample toasts</button>
        </div>
    }
}

export default Inventory