import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '/teachat.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import summaryAPI from '../common/summaryAPI';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [ loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value, 
    });
  };

  const  toastOptions = {
      position: "top-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
    setLoading(true)

    setTimeout(async () => {
      try {
        const response = await Axios({
          ...summaryAPI.register,
          data: data
        })
  
        if (response.data.error) {
          toast.error(response.data.message, toastOptions)
        }
  
        if (response.data.success) {
          toast.success(response.data.message, toastOptions);
          setData({
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
          });
          navigate('/login')
        }
  
      } catch (error) {
        AxiosToastError(error)
      }
    },3000)
  };

  const handleValidation = () => {
    const { username, email, password, confirmpassword } = data;
    if(password !== confirmpassword) {
        toast.error("Passwords and Confirm Password do not match", toastOptions) ;
    } else if (username.length < 3) {
        toast.error("Username should be greater than 3 characters", toastOptions) ;
    } else if(password.length < 8) {
        toast.error("Password should be greater than 8 characters", toastOptions) ;
    } else if (email === "") {
        toast.error("Email is required", toastOptions) ;
    } else {
        
    }
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <form onSubmit={handleSubmit}>

          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Teachat</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />

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
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={data.confirmpassword}
            onChange={handleChange}
            required
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled ={loading}
          >
            {loading? <CircularProgress size={16} color='white'/> : 'CREATE ACCOUNT'}

          </Button>

          <span>Already have an account? <Link to={'/login'}>Login</Link> </span>
        </form>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Register;

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
