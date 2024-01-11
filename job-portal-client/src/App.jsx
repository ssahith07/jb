import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css'
import Snavbar from './components/Snavbar'
// import Home from './Pages/Home';
// import Passage from './components/Passage';

function App() {
  return (
    <>
      <Navbar/>
      {/* <Snavbar /> */}
      <Outlet />
    </>
  );
}

export default App;
