import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Proses login
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4">Register</h3>

          <form onSubmit={handleLogin}>
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

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">
                Login
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
