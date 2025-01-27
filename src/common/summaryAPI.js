export const baseURL = 'http://localhost:5689';


const summaryAPI = {
    register: {
        url: 'api/v1/user/register',
        method: 'POST'
    },
    login: {
        url: 'api/v1/user/login',
        method: 'POST'
    }
}

export default summaryAPI