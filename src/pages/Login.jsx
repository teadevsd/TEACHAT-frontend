import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CircularProgress } from '@mui/material';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import summaryAPI from '../common/summaryAPI';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        identifier: '', // Now a generic identifier
        password: '',
    });

    const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {
      if(localStorage.getItem('accessToken')) 
        navigate('/');
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await Axios({
                ...summaryAPI.login,
                data,
                withCredentials: true,
                headers,
            });

            if (response.data.error) {
                toast.error(response.data.message, toastOptions);
            } else if (response.data.success) {
                const { accessToken } = response.data.data;

                // Store token
                localStorage.setItem('accessToken', accessToken);
                document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax`;

                toast.success(response.data.message, toastOptions);
                setTimeout(() => {
                    navigate('/chat'); // Navigate after a short delay
                }, 2000); // Allow the success message to display
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <InnerWrapper>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <h1>Teachat</h1>
                    </div>

                    <input
                        type="text" // Accept both username and email
                        placeholder="Username or Email"
                        name="identifier"
                        value={data.identifier}
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

                    <Button
                        type="submit"
                        variant="contained"
                        color="warning"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'LOGIN'}
                    </Button>

                    <span>
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </span>
                </form>
            </InnerWrapper>
            <ToastContainer />
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
