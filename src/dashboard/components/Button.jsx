import React from 'react';

const Button = ({ onPress, children }) => (
  <button onClick={onPress}>
    {children}
  </button>
);

export default Button;
