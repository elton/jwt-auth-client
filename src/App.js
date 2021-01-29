import React, {useState} from 'react';
import axios from 'axios';

const apiURL = 'http://localhost:3000';

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(`${apiURL}`+config.url);
        const allowedOrigins = [apiURL];
        const token = localStorage.getItem('token');
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

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
        localStorage.setItem('token',data.access_token)
        setJwt(data.access_token)
    }

    const getTodos = async() => {
        try {
            const {data} = await axios.get('/todos');
            setTodos(data)
            setFetchError(null)
        } catch(err) {
            setFetchError(err.messages)
        }
    }
    return (
    <>
        <section>
            <button onClick={()=>getJwt()}>Get JWT</button>
            {jwt && (
                <pre><code>{jwt}</code></pre>
            )}
        </section>
        <br />
        <section>
            <button onClick={()=>getTodos()}>Get Todos</button>
            <ul>
                {todos.map((todo,i) =>(
                    <li key={i}>{todo}</li>
                ))}
            </ul>
        </section>
    </>
  );
}

export default App;
