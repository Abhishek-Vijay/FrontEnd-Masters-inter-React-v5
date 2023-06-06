import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

// same as creating IProps
class ErrorBoundary extends Component<{children: ReactElement}>{
    state ={
        hasError: false
    };
    // Every time an Error occurs, it's gonna call this function and we will decide this function should set the new state to be.
    // static method has to be called on class directly like this -> ErrorBoundary.getDerivedStateFromError() 
    static getDerivedStateFromError(){
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo){
        // Typically you would log this to something like TrackJS
        console.error("ErrorBoundary component caught an error ", error, info);

    }

    render(){
        if(this.state.hasError){
            return (
                <h2>
                    There was an error with this listing. <Link to='/'>Click here</Link> to go back to the Home page
                </h2>
            )
        }

        // if no error then it will render the child component to which we are going to surround this component.
        return this.props.children;
    }
}

export default ErrorBoundary;