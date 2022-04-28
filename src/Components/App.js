import React from "react"
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component {
    render() {
        return (
            <div className="toast-of-the-day">
                <div className="menu">
                    <Header tagline="Toast market"></Header>
                </div>
                <Order></Order>
                <Inventory></Inventory>
            </div>
        )
    }
}

export default App;