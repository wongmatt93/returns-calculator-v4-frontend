import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./LandingPage.css";

const LandingPage = () => {
  const { currentUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    currentUserProfile && navigate("/overview");
  }, [currentUserProfile]);
  return <div className="LandingPage">LandingPage works</div>;
};

export default LandingPage;
