import logo from "./logo.svg";
// import './App.css';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Landing from "./components/Landing/Landing";
import Form from "./components/Form/Form";
import Explore from "./components/Explore/Explore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/form" element={<Form />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
