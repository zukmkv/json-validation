import { useState } from 'react'
import './App.css'
import { fetchMockData, RANDOM_USER_URL } from './api'
import { Loader } from './components/loader';

function App() {

  const [json, setJson] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(url: string) {
    setIsLoading(true);
    setJson("");
    const result = await fetchMockData(url);
    setIsLoading(false);
    setJson(JSON.stringify(result, null, 2));
  }

  return (
    <>
      <button onClick={() => handleClick(RANDOM_USER_URL)}>
        Fetch random JSON
      </button>
      {isLoading ? <Loader /> : <pre>
        {json}
      </pre>}
    </>
  )
}

export default App
