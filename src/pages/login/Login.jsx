import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

{/*useState for the login*/}
const Login = () => {
  const [inputs, setInputs] =useState({
    username: "",
    password: "",

  });
  const [err, setErr] =useState(null);

  const navigate = useNavigate()
  //Handles the changes that is inputted in the login form
  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
    console.log(inputs);
  };
  //logins the user and puts them to the home page
  const { login } = useContext(AuthContext);

  const handleLogin = async(e) => {
    
    e.preventDefault(); //prevents the user to go to a blank screen
    try{
      await login(inputs);
      navigate ('/') //navigates to home page
    }catch(err){ //catches errors
      setErr(err.response.data)
    }
    
  };

  return (
    //the login card
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Demi</h1>
          <p>
            
          Welcome to Demi! The very cool social social media app!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          {/* the login form*/}
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && err} {/* shows if the user inputted the right username or password*/}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
