import React from 'react';
import logoFont from '../../../css/fonts/Billabong.ttf';

class Logo extends React.Component {
    render() {
        return (
            <div style={{ fontFamily: logoFont, fontSize: '3.5em' }}>
                Instagram
            </div>
        );
    }
}

export default Logo;