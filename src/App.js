import './App.css';
import Form from  './Form.js';
import DocumentUpload from './DocumentUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Submission Form</h1>
      </header>
      <div>
        <Form/>
        <DocumentUpload/>
      </div>
    </div>
  );
}

export default App;
