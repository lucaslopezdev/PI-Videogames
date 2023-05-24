import './App.css';
import { Home, Landing, Detail, Create } from './views';
import About from './components/About/About'
import { Route, Routes } from 'react-router-dom';


function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/detail/:detailId" element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;
