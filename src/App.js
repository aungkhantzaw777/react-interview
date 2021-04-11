
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./home.js";
import Signup from "./signup.js";

function App() {
  return (
    
    <Router>
      <div style={{backgroundColor:'#282c34'}} >
        <div class="max-w-3xl mx-auto flex justify-between text-white py-5" >
          <Link to="/">
            <div class="text-lg font-bold">Home</div>
          </Link>
          <div className="login-wrap">

            <Link to="/signup">
              <span class="text-white">Sign Up</span>
            </Link>
            
          </div>
          
        </div>
        
      </div>
      <Switch>
        <Route path="/" exact children={<Home />} />
        <Route path="/signup" children={<Signup />} />
        
        </Switch>
    </Router>
  );
}

export default App;
