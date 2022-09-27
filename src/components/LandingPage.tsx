import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./LandingPage.css";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/overview");
  }, [user]);

  return <div className="LandingPage">LandingPage works</div>;
};

export default LandingPage;
