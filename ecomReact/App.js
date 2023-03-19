//import logo from './logo.svg';
import './styles.css'
import './App.css';
import Home from "./components/Home"
import Productdetail from './components/Productdetail';
import Cart from './components/Cart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Searched from './components/Searched';
import { SignUp } from './components/Signup';
import { Login } from './components/Login'
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' exact element={<SignUp />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/home' exact element={<Home />} />
      <Route path='/product/:id' exact element={<Productdetail />} />
      <Route path='/cart/:id' exact element={<Cart />} />
      <Route path='/search/:searchItem' exact element={<Searched />} />
      <Route path='/checkout' exact element={<Checkout/>} />
    </Routes>
    </Router>
  );
}

export default App;


