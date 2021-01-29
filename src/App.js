import React, {useState} from 'react';
import axios from 'axios';

// const apiURL = 'http://localhost:8080';

// axios.interceptors.request.use(
//     config => {
//         const { origin } = new URL(config.url);
//         const allowedOrigins = [apiURL];
//         const token = localStorage.getItem('token');
//         if (allowedOrigins.includes(origin)) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

function App() {
    const storeJWT = localStorage.getItem('token');
    const [jwt, setJwt] = useState(storeJWT||null);
    const [todos, setTodos] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const getJwt = async() => {
        const {data} = await axios.post('/login', {
                "username":"username",
                "password":"password"
            }
        )
        console.log(data.access_token)
    }
    return (
    <>
        <section>
            <button onClick={()=>getJwt()}>Get JWt</button>
        </section>
    </>
  );
}

export default App;
