import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loader from '../../src/assets/images/loadertwo.gif'  // Ensure the correct path
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'

const SetAvatar = () => {

    const api = 'https://api.multiavatar.com/'; // Base URL for avatar images
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];

            for (let i = 0; i < 4; i++) {
                const avatarId = Math.round(Math.random() * 1000);  // Generate a random ID for avatar
                const imageUrl = `${api}${avatarId}.svg`;  // Construct the avatar image URL
                data.push(imageUrl);  // Store the image URL directly
            }

            setAvatars(data); // Set the avatars state with the image URLs

            // Delay setting isLoading to false to allow the loader to display for a while
            setTimeout(() => {
                setIsLoading(false); // Set loading to false after avatars are fetched
            }, 1500); // Delay for 500ms (can be adjusted to suit)
        }

        fetchAvatars();
    }, []);  // Empty dependency array to fetch avatars on component mount

    const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const setProfilePicture = () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions);
        }
    }

    return (
        <Wrapper>
            {/* Render loader when loading avatars */}
            {isLoading ? (
                <div className="loader">
                    <img src={loader} alt="loading" />
                </div>
            ) : (
                <>
                    {/* Render avatars when loading is complete */}
                    <div className="titleContainer">
                        <h1>Pick an avatar as your display picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                            >
                                <img
                                    src={avatar} // Use the correct avatar URL here
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <button className='submitBtn' onClick={setProfilePicture}>Set as Profile Picture</button>
                </>
            )}
        </Wrapper>
    )
}

export default SetAvatar

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

    .titleContainer {
        text-align: center;
        margin-bottom: 20px;

        h1 {
            font-size: 20px;
        }
    }

    .avatars {
        display: flex;
        justify-content: center;
        gap: 20px;

        .avatar {
            border: 2px solid transparent;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            &.selected {
                border-color: #ff7b00;
            }

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
            }
        }
    }

    .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed; 
            top: 0; 
            left: 0;
            width: 100vw !important;
            height: 100vh !important;
            
            z-index: 9999; 
        }


    button {
        margin-top: 20px;
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
`
