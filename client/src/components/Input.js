import React from 'react';

const Input = ({ label, value, setValue, type = 'text', autocomplete = '', placeholder = '' }) => {
  return (
    <div className='mb-3'>
      <label className='form-label text-start'>{label}</label>
      <input
        className='form-control'
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        autoComplete={autocomplete}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
