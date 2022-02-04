import React from 'react';

const Button = ({
  loading = false,
  type = 'primary',
  size = 'md',
  text = 'Submit',
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`btn btn-${type} btn-${size} ${loading && 'disabled'}`}
      aria-disabled={loading ? 'true' : 'false'}
    >
      {text}
    </button>
  );
};

export default Button;
