import React from 'react';
import Button from 'react-toolbox/lib/button/Button';
import theme from './SuccessButton.css';

const SuccessButton = (props) => {
    console.log(theme);
    return (<Button {...props} theme={theme} />)
};
export default SuccessButton;