import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '/teachat.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', data); // Example API endpoint
      console.log(response.data); // Handle success
    } catch (error) {
      console.error('Error during registration:', error); // Handle error
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Teachat</h1>
          </div>

         

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />

        

          <button type="submit">LOGIN</button>

          <span>Don't have an account? <Link to={'/register'}>Sign up</Link> </span>
        </form>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const InnerWrapper = styled.div`
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;

    img {
      width: 60px;
    }

    h1 {
      font-size: 24px;
      color: #333;
    }
  }

  form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 40px 80px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;

    span {
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;

        a {
            text-decoration: none;
            color: red;

        }
    }

    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #f9ce5aa6;
      border-radius: 5px;
      font-size: 14px;
      color: #555;
      background-color: transparent;
    }

    input:focus {
      border-color: #ffbb00;
      outline: none;
    }

    button {
      padding: 12px;
      background-color: #ff7b00;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;

    }

    button:hover {
      background-color: #b33000;
    }
  }
`;
