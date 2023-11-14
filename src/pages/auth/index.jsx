import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      <h1>Sign In with google to continue..</h1>
      <button className="login-btn" onClick={signWithGoogle}>
        sign in with Google
      </button>
    </div>
  );
};

export default Auth;
