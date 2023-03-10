//import logo from './logo.svg';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './components/Login';
import {SignUp} from './components/SignUp';
import { Gig } from './components/Gig';
import { Logout } from './components/Logout';
import { MyGig } from './components/MyGig';
import {useState} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Creategig } from './components/Creategig';
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

const [loginItem,setLoginItem]=useState(<div></div>)

const [SignUpItem,setSignUpItem]=useState(<div></div>)

  function Loginfunc(){

    setLoginItem(
    <div>
      <Login />
          </div>
    )
  }

    function Signupfunc(){

      setSignUpItem(
      <div>
        <SignUp />
            </div>
      )

  }
  return (
    <Router>

    <div className="App">
      <Routes>
        
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/" exact element={
        
        <div><Link to='/signup'>
      <button>SignUp</button>
      </Link>
      
      <Link to='/login'>
      <button>Login</button>
      </Link>

      </div>
    
      } 
      
      />
      
      <Route path="/login" exact element={<Login />} />

      <Route path="/logout" exact element={<Logout />} />


      <Route path="/gig" exact element={<Gig />} />

      <Route path="/addGig" exact element={<Creategig />} />

      <Route path="/MyGig" exact element={<MyGig />} />
      </Routes>

    </div>
    </Router> 
  );
}

export default App;

