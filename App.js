import './Frontend/Tse.css'
import './App.css';
import { BrowserRouter as Router, Route,Routes,} from 'react-router-dom';
import Tsetse from './Frontend/Tsetse'
import AboutTse from './Frontend/About';
import Login from './Frontend/Login';
import Navigation from './Frontend/Navigation';
import Map from './Frontend/Map';
import './Frontend/Tse.css'

function App() {
  return (
    <Router>
      <div className="App">
      <Navigation />
      <Routes>
      <Route  path ="/" element ={<Tsetse/>}/>
      <Route  path ="/about" element ={<AboutTse/>}/>
      <Route  path = "/login" element = {<Login/>}/>
      <Route  path = "/map"  element = {<Map/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
