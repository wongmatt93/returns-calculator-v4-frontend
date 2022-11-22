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
  }, [user, navigate]);

  return (
    <header className="Header">
      <Link to="/" style={{ textDecoration: "none" }} className="title">
        <h1>Returns Calculator</h1>
      </Link>
      {user && (
        <nav>
          <ul>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>Home</li>
            </Link>
            <Link to="/portfolio" style={{ textDecoration: "none" }}>
              <li>Portfolio</li>
            </Link>
            <Link to="/research" style={{ textDecoration: "none" }}>
              <li>Research</li>
            </Link>
            <Link to="/history" style={{ textDecoration: "none" }}>
              <li>History</li>
            </Link>
          </ul>
        </nav>
      )}
      <div className="button-container">
        {user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
