import {useState} from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
const Register = () => {
  //usetates to be used for the register form
  const [inputs, setInputs] =useState({
    username: "",
    email: "",
    password: "",
    name: "",

  });
  const [err, setErr] =useState(null);
  //Handles the changes that is inputted in the register form
  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
    console.log(inputs);
  };
  const handleClick =async e =>{
    e.preventDefault()

      try{
        await axios.post("http://localhost:8800/api/auth/register", inputs);
      }catch(err){
        setErr(err.response.data);
      }
  };
  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Demi</h1>
          <p>
            Welcome to Demi! The very cool social social media app!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {/*Form for registration */}
          <form>
            <input type="text" placeholder="Username" name ="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name ="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name ="password" onChange={handleChange}/>
            <input type="text" placeholder="Name" name ="name" onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
