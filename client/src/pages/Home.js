import React, { useContext, useEffect, useState } from 'react';
import PriceCard from '../components/cards/PriceCard';
import axios from 'axios';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data } = await axios.get('/prices');
      setPrices(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClick = async (e, price) => {
    e.preventDefault();
    if (state && state.token) {
      const { data } = await axios.post('/create-subscription', { priceId: price.id });
      window.open(data);
    } else {
      navigate('/register');
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row col-md-6 offset-md-3 text-center'>
        <h1 className='pt-5 fw-bold'>Explore the right plan for your business</h1>
        <p className='lead pb-4'>Choose a plan that suites you best!</p>
      </div>
      <div className='row pt-5 mb-3 text-center'>
        {prices &&
          prices.map((price) => (
            <PriceCard key={price.id} price={price} handleSubscription={handleClick} />
          ))}
      </div>
    </div>
  );
};

export default Home;
