import React from "react";

export default function Forgotpassword() {
  return (
    <>
      <div className="outer">
        <div className="form">
          <h1>Reset Password</h1>
          <form>
            <input
              type="password"
              placeholder="Enter new password"
              required
            />

            <button type="submit" className="buttons">Change Password</button>
          </form>
        </div>
      </div>
    </>
  );
}

