import { useState, useEffect } from "react";
import WebPlayback from "./components/webPlayback";
import Login from "./components/login";
import "./App.css";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }
    getToken();
  }, []);

  return <>{token === "" ? <Login /> : <WebPlayback token={token} />}</>;
}
