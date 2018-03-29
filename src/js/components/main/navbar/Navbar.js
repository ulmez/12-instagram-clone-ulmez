import React from 'react';
import { Link } from 'react-router-dom';

import logoFont from '../../../../css/fonts/Billabong.ttf';

class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li className="float-left padding-top-instagram" style={{ fontFamily: logoFont, fontSize: '2.2em' }}><Link to='/start'>Instagram</Link></li>
                    <li className="float-left padding-top-menu-item"><Link to='/user'>User</Link></li>
                    <li className="float-left padding-top-menu-item"><Link to='/explore'>Explore</Link></li>
                    <li className="padding-top-menu-item"><Link to='/login'>Logout</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;