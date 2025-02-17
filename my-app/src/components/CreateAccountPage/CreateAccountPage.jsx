import React, { useState } from 'react';
import { auth, registerWithEmailAndPassword } from '../../firebase.js';

import './CreateAccountPage.css';
const CreateAccountPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const emailRegex = new RegExp('^[A-Za-z0-9._%+-]+@uga.edu$');

  const handleSubmit = async () => {
    if (validCreation()) {
      registerWithEmailAndPassword(auth, email, password);
    }
  };

  const validCreation = () => {
    try {
      checkPasswords();
      checkEmail();
    } catch (error) {
      alert(error.message);
      return false;
    }
    return true;
  };

  const checkPasswords = () => {
    if (password !== confirm) {
      throw new Error('Passwords must match');
    }
  };

  const checkEmail = () => {
    if (!emailRegex.test(email)) {
      throw new Error('Email must be a valid @uga.edu email address');
    }
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="email">
          Email
          <br />
          <input
            type="email"
            name="email"
            placeholder="hairdawg@uga.edu"
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <br />
          <input
            type="password"
            name="password"
            placeholder="••••••••••"
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <label htmlFor="confirm">
          Confirm Password
          <br />
          <input
            type="password"
            name="confirm"
            placeholder="••••••••••"
            onChange={event => setConfirm(event.target.value)}
          />
        </label>
        <br />
        <button className="create-account" onClick={handleSubmit}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
