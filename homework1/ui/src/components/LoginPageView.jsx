import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the username and password
    if (username === "" || password === "") {
      setError("Username and password cannot be empty");
      return;
    }

    // TODO: Send a request to the server to verify the username and password
	fetch("http://127.0.0.1:4444/login", {
	  method: "GET",
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json",
	    'Accept': 'application/json'
	  },
	  body: JSON.stringify({
	    username,
	    password
	  })
	})
	  .then((res) => {
	    if (!res.ok) {
	      console.error('Response not OK:', res.status, res.statusText);
	      throw new Error(res.statusText);
	    }
	    return res.json();
	  })
	  .then((data) => {
	    if (data.error) {
	      setError(data.error);
	    } else {
	      // Redirect the user to the chat page
	      window.location.href = '/chat';
	    }
	  })
	  .catch((err) => {
	    setError("An error occurred while trying to sign up");
	    console.error(err);
	  });
    // Redirect to chat page if logged in successfully
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        {/* TODO add an input for password */}
		<input
		  type="password"
		  placeholder="Password"
		  value={password}
		  onChange={handlePasswordChange}
		/>
        <button type="submit">Login</button>
      </form>
      <Link className="signup-link" to="/signup">Create an account</Link>
      {error !== "" && <div className="error">{error}</div>}
    </div>
  );
};

export default LoginPage;
