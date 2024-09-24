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
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Hello {name}</h2>
    </div>
  );
};

export default Dashboard;
