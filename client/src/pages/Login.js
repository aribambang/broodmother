import React, { useState, useContext } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useContext(UserContext);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.post('/login', {
        email,
        password,
      });

      setEmail('');
      setPassword('');
      setLoading(false);

      localStorage.setItem('auth', JSON.stringify(data));
      setState(data);
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center' style={{ height: '80vh' }}>
      <div className='container align-items-center d-flex'>
        <div className='row col-md-6 offset-md-3 '>
          <h1 className='pt-5 fw-bold text-center'>Login</h1>
          <p className='lead pb-4 text-center'>Access your subscription, Anywhere, Anytime.</p>
          <form className='form-group'>
            <Input
              label={'Email'}
              type='email'
              value={email}
              setValue={setEmail}
              placeholder='Input your email'
            />
            <Input
              label={'Password'}
              type='password'
              value={password}
              setValue={setPassword}
              autocomplete='current-password'
              placeholder='Input your password'
            />

            <div className='d-grid'>
              <Button loading={loading} text='LOGIN' handleClick={handleLogin} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
