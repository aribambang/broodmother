import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

const Plans = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);
  const [plan, setPlan] = useState({});
  const plans = [
    {
      name: 'Basic',
      slug: 'basic',
      description: 'Here are your 5 exclusive stocks of this month',
      stocks: ['Tesla', 'Apple', 'Microsoft', 'Amazon', 'IBM'],
    },
    {
      name: 'Standard',
      slug: 'standard',
      description: 'Here are your 10 exclusive stocks of this month',
      stocks: ['Tesla', 'Apple', 'Microsoft', 'Amazon', 'IBM'],
    },
    {
      name: 'Premium',
      slug: 'premium',
      description: 'Here are your 20 exclusive stocks of this month',
      stocks: ['Tesla', 'Apple', 'Microsoft', 'Amazon', 'IBM'],
    },
  ];

  useEffect(() => {
    if (state && state.token) getUserSubscriptions();
  }, [state && state.token]);

  const getUserSubscriptions = () => {
    const result = [];
    const planParams = plans.find((p) => p.slug === params.name);
    state &&
      state.user.subscriptions.map((subscription) => {
        result.push(subscription.plan.nickname.toLowerCase());
      });

    if (!result.includes(params.name)) {
      return navigate('/');
    }

    setPlan(planParams);
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='row py-5 bg-light text-center'>
          <h1 className='display-4 fw-bold'>{plan.name}</h1>
          <p className='lead'>{plan.description}</p>
        </div>
      </div>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-8 p-5 rounded bg-dark text-light'>
            <ul className='lead'>
              {plan.stocks && plan.stocks.map((s, index) => <li key={index}>{s}</li>)}
            </ul>
          </div>
          <div className='col-md-4'>
            <h4>Market Analysis</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita cum blanditiis,
              veniam at ducimus nulla quam eum sit non praesentium qui vitae mollitia, sapiente eius
              suscipit rem a et? Corrupti.
            </p>
            <h4>Email support</h4>
            <p>broodmother@domain.com</p>
            <h4>Help Center</h4>
            <p>62 123 456</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
