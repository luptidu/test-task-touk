import React from 'react';
import { Link, Redirect } from "react-router-dom";

class SearchBar extends React.Component {
    state = {
        value: this.props.initalValue || '',
        redirect: false
    }

    handleInputChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleButtonClick = (event) => {
        this.setState({ redirect: true })
    }

    handleKeyPress = (event) => {
        if (event.key == 'Enter' && this.state.value.length > 0) {
            this.setState({ redirect: true })
        }
    }

    componentDidUpdate() {
        if (this.state.redirect) {
            this.setState({ redirect: false });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/', search: `?login=${this.state.value}` }} />
        }

        return (
            <div className="row justify-content-center">
                <div className="col-sm-6 d-flex pb-3">
                    <input
                        className="form-control mr-3"
                        value={this.state.value}
                        onChange={this.handleInputChange}
                        type="text"
                        maxLength="39"
                        onKeyPress={this.handleKeyPress}
                        autoFocus
                    />
                    <Link to={{ pathname: '/', search: `?login=${this.state.value}` }}>
                        <button
                            className="btn btn-primary"
                            onClick={this.handleButtonClick}
                            disabled={this.state.value.length === 0}
                            onKeyPress={this.handleKeyPress}
                        >Search</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SearchBar;
