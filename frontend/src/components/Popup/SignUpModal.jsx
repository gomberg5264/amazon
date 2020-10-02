import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/user/UserState";
import FlashMessage from "react-flash-message";

export default function SignUpModal({ handleClose }) {
  let ErrorMessage = "";

  const { registerUser, token } = useContext(UserContext);

  const emailElRef = useRef();
  const pwElRef = useRef();
  const confirmPwElRef = useRef();

  function handleRegisterUser(e) {
    e.preventDefault();
    const email = emailElRef.current ? emailElRef.current.value : "";
    const pw = pwElRef.current ? pwElRef.current.value : "";
    const confirmPw = confirmPwElRef.current
      ? confirmPwElRef.current.value
      : "";
    registerUser(email, pw, confirmPw);

    if (token) {
      handleClose();
    } else {
      ErrorMessage = <small className="text-danger">Not valid</small>;
    }
  }
  function handleRevealPw() {
    document.getElementById("confirmPw").type = "text";
    console.log(ErrorMessage);
  }

  return (
    <>
      <h2 className="bold mb-4">Sign Up</h2>
      <form onSubmit={handleRegisterUser}>
        <div className="form-group">
          <label htmlFor="email" className="bold d-block">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            required
            ref={emailElRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="bold d-block">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            minLength="5"
            required
            ref={pwElRef}
          />
        </div>

        <div className={`form-group mb-1`}>
          <label htmlFor="password" className="bold d-block">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            minLength="5"
            required
            id="confirmPw"
            ref={confirmPwElRef}
          />
        </div>

        {/* Error message */}
        <small className="text-danger">{ErrorMessage}</small>

        <button type="submit" className="btn btn-primary btn-md mt-3">
          Sign Up
        </button>
        <button onClick={handleRevealPw}>reveal</button>
      </form>
    </>
  );
}
