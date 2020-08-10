import React, {Component} from "react";
import {GenericErrorMsg} from "./components/ui/error/GenericErrorMsg";

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.log(`error = ${error}, errorInfo = ${JSON.stringify(errorInfo)}`)
    }

    render() {
        if (this.state.hasError) {
            return (
                <GenericErrorMsg/>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;