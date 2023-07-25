
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function SubmitForm() {
  const navigate = useNavigate();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleNameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError(false); 
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordError(false); 
  }

  const handleSubmit = event => {
    event.preventDefault();

    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );

    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    const email = event.target.email.value;
    const password = event.target.password.value;

    
    const isEmailValid = validEmail.test(email)

;
    const isPasswordValid = validPassword.test(password);


    if (!isEmailValid) {
      setEmailError(true);
    }

    
    if (!isPasswordValid) {
      setPasswordError(true);
    }

    if (isEmailValid && isPasswordValid) {
      console.log(name, email, password);

      try {
        axios.post('http://localhost:3000/register',{name,email,password})
          .then(res => {
            console.log(res);
            if (res.data === "exist") {
              alert("User already exists");
            } else  {
              alert("Registration successful");
              navigate('/login')
            }
            
          })
          .catch(error => {
            console.error(error);
            alert(" error occurred .");
          });
      } catch (error) {
        console.error(error);
        alert(" error occurred .");
      }
    }
  };

  return (
    <div style={{marginTop:100}} className="loginpages">
          <form onSubmit={handleSubmit} style={{padding:20, margin:-40, }} className="inputform">
            <h1 className='headinglog'>Register</h1>
            <input type="text" style={{width:"90%"}} value={name} name="name" placeholder="Name" className="loginpage" onChange={handleNameChange} /><br />
            <input type="text" style={{width:"90%"}} value={email} name="email" placeholder="Enter Email" className="loginpage" onChange={handleEmailChange} /><br />
            {passwordError && <span style={{ color: "red" }}>Password must contain atleast 6 characters including alphabhets and numbers</span>}
            <input type="password" style={{width:"90%"}} name="password" value={password} placeholder="Enter Password" className="loginpage" onChange={handlePasswordChange} /><br />
            <button type="submit" style={{width:70}} className='loginbutton'>Submit</button><br />
            <h5>Already have an account ? <Link to="/login" >login</Link></h5>
          </form>
        </div>
    
  );
}

export default SubmitForm;