import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/");
  }, [user]);

  return (
    <header className="Header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>Returns Calculator</h1>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <p>Home</p>
      </Link>
      <Link to="/portfolio" style={{ textDecoration: "none" }}>
        <p>Portfolio</p>
      </Link>
      <Link to="/history" style={{ textDecoration: "none" }}>
        <p>History</p>
      </Link>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </header>
  );
};

export default Header;
