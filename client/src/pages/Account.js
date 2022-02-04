import React, { useContext, useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { UserContext } from '../context';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';

const Account = () => {
  const [state, setState] = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (state && state.token) getSubscriptions();
  }, [state && state.token]);

  const getSubscriptions = async () => {
    const { data } = await axios.get('/subscriptions');
    setSubscriptions(data.data);
  };

  return (
    <div className='container'>
      <div className='row'>
        <UserOutlined className='display-4' />
        <h1>Account</h1>
        <p className='lead pb4'>Subscription status</p>
      </div>
      <div className='row'>
        {subscriptions &&
          subscriptions.map((subscription) => (
            <div key={subscription.id}>
              <section>
                <hr />
                <h4 className='fw-bold'>{subscription.plan.nickname}</h4>
                <h5>
                  {(subscription.plan.amount / 100).toLocaleString('en-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </h5>
                <p>Status: {subscription.status}</p>
                <p>Card last 4 digit: {subscription.default_payment_method.card.last4}</p>
                <p>
                  Current period end:{' '}
                  {moment(subscription.current_period_end * 1000)
                    .locale('id')
                    .format('LLLL')}
                </p>
                <button className='btn btn-outline-danger'>Access</button>{' '}
                <button className='btn btn-outline-warning'>Manage Subscription</button>
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Account;
