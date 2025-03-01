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
  const [dataState, setDataState] = useState({
    json: "",
    schema: "",
    isLoading: false,
  });

  const [validationMessage, setValidationMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleFetch(jsonUrl: string, schemaUrl: string) {
    setDataState({ json: "", schema: "", isLoading: true });
    setIsDialogOpen(false);

    const [jsonResult, schemaResult] = await Promise.allSettled([
      fetchMockData(jsonUrl),
      fetchMockData(schemaUrl),
    ]);

    setDataState({
      isLoading: false,
      json: setJsonState(jsonResult, 'Ошибка загрузки JSON'),
      schema: setJsonState(schemaResult, 'Ошибка загрузки схемы'),
    });
  }

  function handleValidate(json: string, schema: string) {
    if (json && schema) {
      try {
        const result = validate(JSON.parse(json), JSON.parse(schema));
        setValidationMessage(result.valid
          ? "JSON соответствует схеме!"
          : `Ошибки валидации:\n- ${result.errors.map(error => error.stack).join("\n- ")}`
        )
      } catch (error) {
        setValidationMessage(`Ошибка валидации: ${error}`);
      }

      setIsDialogOpen(true);
    }
  }

  return (
    <>
      <div className="fetch-button-wrapper">
        <button onClick={() => handleFetch(RANDOM_USER_URL, RANDOM_USER_SCHEMA_URL)} disabled={dataState.isLoading}>
          Загрузить данные
        </button>
        {dataState.isLoading && <Loader />}
      </div>

      <button onClick={() => handleValidate(dataState.json, dataState.schema)}>Проверить</button>

      <div className="flex-wrapper">
        <JsonPreview title="JSON" data={dataState.json} />
        <JsonPreview title="JSON Schema" data={dataState.schema} />
      </div>

      {isDialogOpen && (
        <dialog open className="validation-dialog">
          <pre>{validationMessage}</pre>
          <button className="dialog-button" onClick={() => setIsDialogOpen(false)}>Закрыть</button>
        </dialog>
      )}
    </>
  );
}

function setJsonState(json: PromiseSettledResult<string>, error: string) {
  return json.status === "fulfilled"
    ? JSON.stringify(json.value, null, 2)
    : `${error}: ${json.reason}`;
}

export default App;
