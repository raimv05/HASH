import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const App = () => {
  const [textInput, setTextInput] = useState("");
  const [hashedValue, setHashedValue] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleHashButtonClick = () => {
    const hashValue = CryptoJS.SHA256(textInput).toString();
    setHashedValue(hashValue);
  };

  const handleVerifyButtonClick = () => {
    axios
      .post("http://localhost:3001/verify", { textInput, hashedValue })
      .then((response) => {
        setVerificationResult(response.data.result);
      })
      .catch((error) => {
        console.error("Error verifying hash:", error);
      });
  };

  return (
    <div>
      <h1>Text Hashing and Verification</h1>
      <div>
        <label>Enter Text:</label>
        <input type="text" value={textInput} onChange={handleTextInputChange} />
      </div>
      <div>
        <button onClick={handleHashButtonClick}>Hash Text</button>
      </div>
      <div>
        <p>Hashed Value: {hashedValue}</p>
      </div>
      <div>
        <button onClick={handleVerifyButtonClick}>Verify Hash</button>
      </div>
      {verificationResult && (
        <div>
          <p>Verification Result: {verificationResult}</p>
        </div>
      )}
    </div>
  );
};

export default App;
