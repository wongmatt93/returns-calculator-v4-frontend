import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import "./LandingPage.css";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/home");
  }, [user, navigate]);

  return (
    <main className="LandingPage">
      <section>
        <h2>Show Me The Cash</h2>
        <p>Introducing a new way to track your portfolio</p>
      </section>
      <section>
        <h3>Mission</h3>
        <p>
          Providing a way for cash focused investors to easily keep track of
          their returns. This app makes it easy to view the exact cash amounts
          received from cash transactions from options and dividends so that you
          can see how well each investment is performing for you.
        </p>
        <p>Sign in using Google to begin!</p>
        <button onClick={signInWithGoogle}>Sign In</button>
      </section>
    </main>
  );
};

export default LandingPage;
