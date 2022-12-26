import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return (
        <>
        <nav className="navigation">
            <div className="navigation_container">
                <Link to="/" className="nuub_logo">
                    Nuub
                </Link>
            </div>
        </nav>

        </>
    )
}

export default Navigation