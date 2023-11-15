import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import "./styels.css";

const Auth = () => {
  const navigate = useNavigate();
  const signWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
    toast.success("user signed in successfully");
  };
  return (
    <div className="login-page">
      <p>Sign In with google to continue..</p>
      <button className="login-btn" onClick={signWithGoogle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <span>
            <FaGoogle />
          </span>
          <span>sign in with Google</span>
        </div>
      </button>
    </div>
  );
};

export default Auth;
