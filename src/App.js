
import { Route, Routes } from 'react-router-dom';
import './App.css';
import FormValaidation from './components/FarmValidation';
// import UserTable from './components/UserTable';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element ={<FormValaidation/>} />
         {/* <Route path='/' element ={<UserTable />} /> */}
       
      </Routes>
    </div>
  );
}

export default App;
