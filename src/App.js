import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Form from  './Form.js';
import HR from  './HR.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Form/>} />
        <Route path="/hr" element={<HR/>} />
      </Routes>
    </Router>
  );
}

export default App;
