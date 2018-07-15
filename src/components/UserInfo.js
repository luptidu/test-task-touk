import React from 'react';
import dateFormat from 'dateformat';

const UserInfo = (props) => {
    const { user, repos } = props.userInfo;

    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="card mb-3">
                    <img className="card-img-top img-fluid" src={user.avatar_url} alt={user.login} />
                    <div className="card-body">
                        <h5 className="card-title">{user.login}</h5>
                        <span className="card-text">{user.name}</span>
                        <span className="card-text">{user.email}</span>
                    </div>
                </div>
            </div>
            <div className="col-sm-8">
                <ul className="list-group">
                    {repos.map((repo, index) => (
                        <li className="list-group-item" key={index}>
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5 className="card-title">{repo.name}</h5>
                                    <p className="card-text">
                                        {repo.description}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Last updated {dateFormat(repo.updated_at, 'dd-mm-yyyy')}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserInfo;
