import { useState } from "react";
import { validate } from "jsonschema";
import "./App.css";
import {
  fetchMockData,
  RANDOM_USER_SCHEMA_URL,
  RANDOM_USER_URL,
} from "./api";
import { JsonPreview, Loader } from "./view";

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

      <button onClick={() => handleValidate(state.json, state.schema)}>Проверить</button>

      <div className="flex-wrapper">
        <JsonPreview title="JSON" data={state.json} />
        <JsonPreview title="JSON Schema" data={state.schema} />
      </div>
    </>
  );
}

function setJsonState(json: PromiseSettledResult<string>, error: string) {
  return json.status === "fulfilled"
    ? JSON.stringify(json.value, null, 2)
    : `${error}: ${json.reason}`;
}

function handleValidate(json: string, schema: string) {
  if (json && schema) {
    console.log('before')
    console.log(validate(JSON.parse(json), JSON.parse(schema)))
    console.log('after')
  }
}

export default App;