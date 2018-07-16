import React from 'react';
import SearchBar from './SearchBar';
import UserInfo from './UserInfo';
import { getUser, getRepos } from './../api';

class UserInfoSearch extends React.Component {
    state = { userInfo: null }

    constructor(props) {
        super(props);
        this.handleSearch();
    }

    async handleSearch(prevSearchValue) {
        try {
            const searchValue = new URLSearchParams(this.props.location.search).get('login');

            if (!searchValue || searchValue === prevSearchValue) {
                return;
            }

            const [user, repos] = await Promise.all([
                getUser(searchValue),
                getRepos(searchValue)
            ]);

            this.setState({ userInfo: { user, repos } });
        } catch (error) {
            alert(error);
        }
    }

    componentDidUpdate(prevProps) {
        const prevSearchValue = new URLSearchParams(prevProps.location.search).get('login');
        this.handleSearch(prevSearchValue);
    }

    render() {
        const initalValue = new URLSearchParams(this.props.location.search).get('login');

        return (
            <div className="container-fluid p-3">
                <SearchBar initalValue={initalValue} />
                {this.state.userInfo &&
                    <UserInfo userInfo={this.state.userInfo} />
                }
            </div>
        );
    }
}

export default UserInfoSearch;
