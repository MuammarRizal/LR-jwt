import axios, { isAxiosError } from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const Auth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      document.location.href = "/dashboard";
    } catch (error: any) {
      if (error.response) {
        console.log(error);
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4">Login</h3>
          <span className="text-center text-danger d-block my-3">
            {msg && msg}
          </span>{" "}
          <form onSubmit={Auth}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <small>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
