import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    console.log("is valid");

    const response = await api.post("/auth", { email, password });
    console.log(response);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate.to("/dashboard");
    }
  };

  const fetchUsers = async () => {
    const response = await api.get("auth/listUser", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(response);
  };
  return (
    <div className="App">
      <div className="container p-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4 p-3">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {/* {emailError} */}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {/* {passwordError} */}
                </small>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <input type="button" value="Fetch Users" onClick={fetchUsers} />
      <input
        type="button"
        value="Logout"
        onClick={() => localStorage.removeItem("token")}
      />
    </div>
  );
};
export default Login;
