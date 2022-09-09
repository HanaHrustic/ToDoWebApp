import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/todos" replace />}/>
        <Route path='/todos' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;