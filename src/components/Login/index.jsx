import { useState } from 'react';
import './style.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError({ status: false, message: '' });

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        onLogin();
      } else {
        // Set error if login fails
        setError({
          status: true,
          message: data.error || 'Invalid email or password',
        });
      }
    } catch (err) {
      console.error('Error during login', err);
      setLoading(false);
      setError({
        status: true,
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="root-login">
      <div className="loader-container">
        <div className="spinner-wrapper">
          <h3 className="light-font">Please login</h3>
          <div className="login-form">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-wrapper">
                <label className="light-font">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ borderColor: error.status ? 'red' : '' }}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label className="light-font">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ borderColor: error.status ? 'red' : '' }}
                  required
                />
              </div>
              {loading ? (
                <div className="loading-wrapper">
                  <div className="spinner"></div>
                </div>
              ) : (
                <button type="submit" className="login-btn">
                  Login
                </button>
              )}
              {error.status && (
                <p style={{ color: 'var(--alert-color)' }}>{error.message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
