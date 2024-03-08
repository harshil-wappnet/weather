import React, { useState, useEffect, useContext } from 'react';
import { StatusContext } from '../components/contexts/StatusContext';
import { Link } from 'react-router-dom';

function Navbar() {
    const { status } = useContext(StatusContext);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setShowToast(true);
    }, [status]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Weather</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/charts">Charts</Link>
                        </li>
                        <li>
                            <button type="button" className="btn btn-primary position-relative" data-bs-toggle="toast" data-bs-target="#statusToast">
                                Profile
                                <span className={`position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle ${status ? 'text-bg-success' : 'text-bg-danger'}`}>
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="toast align-items-center show zindex" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {status ? 'User Online' : 'User Offline'}
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </nav >
    );
}

export default Navbar;
