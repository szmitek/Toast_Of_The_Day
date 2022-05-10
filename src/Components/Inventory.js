import React from "react"
import AddToast from "./AddToast";
import EditToastForm from "./EditToastForm";
import PropTypes from "prop-types";
import Login from "./Login";
import firebase from "firebase";
import base, {firebaseApp} from "../base";

class Inventory extends React.Component {
    static propTypes = {
        toasts: PropTypes.object,
        updateToast: PropTypes.func,
        deleteToast: PropTypes.func,
        loadSampleToast: PropTypes.func,
        addToast: PropTypes.func
    };
    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async (authData) => {
        const store = await base.fetch(this.props.storeId, {context: this}); //look up the current store in firebase
        if (!store.owner) { //claim it if there is no owner
            await base.post(`${this.props.storeId}/owner`, {data: authData.user.uid}) //save iy as your own
        }
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }




    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
    }
    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };
    render() {
        const logout = <button onClick={this.logout}>Log Out </button>

        //check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }
        //check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not owner</p>
                    {logout}
                </div>
            )
        }
        //they must be the owner, just render inventory
        return <div className="inventory">
            <h2>Inventory</h2>
            {logout}
            {Object.keys(this.props.toasts).map(key => (<EditToastForm key={key} index={key} toast={this.props.toasts[key]} updateToast={this.props.updateToast} deleteToast={this.props.deleteToast}/>))}
            <AddToast addToast={this.props.addToast} />
            <button onClick={this.props.loadSampleToasts}>Load sample toasts</button>
        </div>
    }
}

export default Inventory