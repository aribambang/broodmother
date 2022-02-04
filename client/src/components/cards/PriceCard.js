import React, { useContext } from 'react';
import { UserContext } from '../../context';

const PriceCard = ({ price, handleSubscription }) => {
  const [state] = useContext(UserContext);

  const dynamicDescription = (price) => {
    if (price.nickname === 'BASIC') {
      return '5 exclusive stocks';
    } else if (price.nickname === 'STANDARD') {
      return '10 exclusive stocks';
    }
    if (price.nickname === 'PREMIUM') {
      return '20 exclusive stocks';
    }
  };

  const buttonStyle = () => {
    return price.nickname === 'BASIC' ? 'btn-outline-danger' : 'btn-danger';
  };

  const headerStyle = () => {
    return price.nickname === 'PREMIUM' ? 'bg-danger text-light' : '';
  };

  const borderStyle = () => {
    return price.nickname === 'PREMIUM' ? 'border-danger' : '';
  };

  const buttonText = () => {
    return state && state.token ? 'Buy the plan' : 'Sign Up';
  };

  return (
    <div className='col'>
      <div className={`card mb-4 rounded-3 shadow-sm ${borderStyle()}`}>
        <div className={`card-header py-3 ${headerStyle()}`}>
          <h4 className='my-0 fw-normal'>{price.nickname}</h4>
        </div>
        <div className='card-body'>
          <h2 className='card-title pricing-card-title'>
            {(price.unit_amount / 100).toLocaleString('en-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
            <small className='text-muted fw-light'>/bln</small>
          </h2>
          <ul className='list-unstyled mt-3 mb-4'>
            <li className='fw-bold'>{dynamicDescription(price)}</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
          <button
            onClick={(e) => handleSubscription(e, price)}
            className={`w-100 btn btn-lg ${buttonStyle()}`}
          >
            {buttonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
