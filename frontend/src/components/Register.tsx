import axios from "axios";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      return alert("Tolong sesuaikan password");
    }

    try {
      await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
        confPassword: confirmPassword,
      });
      document.location.href = "/login";
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
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
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={handleRegister}>
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
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
            <div className="form-group mb-3">
              <label htmlFor="confirmpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>
            <span className="text-center text-danger d-block my-3">
              {msg && msg}
            </span>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
          </form>

          <div className="mt-3 text-center">
            <small>
              Do have an account? <Link to="/login">Sign In</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
