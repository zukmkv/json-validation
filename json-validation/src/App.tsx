import { useState } from "react";
import "./App.css";
import {
  fetchMockData,
  JSON_PLACEHOLDER_SCHEMA_URL,
  JSON_PLACEHOLDER_URL,
  RANDOM_USER_SCHEMA_URL,
  RANDOM_USER_URL,
} from "./api";
import { Loader } from "./components/Loader";

function App() {
  const [state, setState] = useState({
    json: "",
    schema: "",
    isLoading: false,
  });

  async function handleFetch(jsonUrl: string, schemaUrl: string) {
    setState({ json: "", schema: "", isLoading: true });

    const [jsonResult, schemaResult] = await Promise.allSettled([
      fetchMockData(jsonUrl),
      fetchMockData(schemaUrl),
    ]);

    setState({
      isLoading: false,
      json: setJsonState(jsonResult, 'Ошибка загрузки JSON'),
      schema: setJsonState(schemaResult, 'Ошибка загрузки схемы'),
    });
  }

  return (
    <>
      <div className="fetch-button-wrapper">
        <button onClick={() => handleFetch(RANDOM_USER_URL, RANDOM_USER_SCHEMA_URL)} disabled={state.isLoading}>
          Загрузить данные
        </button>
        {state.isLoading && <Loader />}
      </div>

      <button onClick={() => { }}>Проверить</button>

      <div className="flex-wrapper">
        {state.json && (
          <div>
            <h2>JSON</h2>
            <pre>{state.json}</pre>
          </div>
        )}
        {state.schema && (
          <div>
            <h2>JSON Schema</h2>
            <pre>{state.schema}</pre>
          </div>
        )}
      </div>
    </>
  );
}

const setJsonState = (json: PromiseSettledResult<string>, error: string) => {
  return json.status === "fulfilled"
    ? JSON.stringify(json.value, null, 2)
    : `${error}: ${json.reason}`;
}

export default App;