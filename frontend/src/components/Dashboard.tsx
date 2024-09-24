import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

interface JwtDecodedCustom {
  name: string;
  exp: string;
}

const Dashboard: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [expires, setExpires] = useState<string>("");
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4000/token");
      setToken(response.data.accessToken);

      const decoded = jwtDecode<JwtDecodedCustom>(response.data.accessToken);
      setName(decoded.name);
      setExpires(decoded.exp);
    } catch (error: any) {
      if (error.response) {
        document.location.href = "/login";
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (parseInt(expires) * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:4000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);

        const decoded = jwtDecode<JwtDecodedCustom>(response.data.accessToken);
        setName(decoded.name);
        setExpires(decoded.exp);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const getUsers = async () => {
    console.log(expires);
    const response = await axiosJWT.get("http://localhost:4000", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
  };
  return (
    <div className="container">
      <h2>Hello {name}</h2>
      <button onClick={getUsers}>Get Users</button>
    </div>
  );
};

export default Dashboard;
