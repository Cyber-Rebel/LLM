import {  Routes, Route} from 'react-router-dom';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import Register from './page/Register.jsx';


const Mainrouter = () =>{
    const user = sessionStorage.getItem("user")

return (

    
        <Routes>
         {/* If logged in → Home, else → Login */}
    <Route path="/" element={user ? <Home /> : <Login/>} />

    {/* If not logged in → Login, else → Home */}
    <Route path="/login" element={!user ? <Login /> : <Home />} />

    {/* If not logged in → Register, else → Home */}
    <Route path="/register" element={!user ? <Register /> : <Home />} />


        </Routes>

);
}
export default Mainrouter;

