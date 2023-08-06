const express = require("express");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const cors = require("cors"); // Import the cors module

const app = express();
const port = 3001;

// Allow CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Sample stored hashed value (for demonstration purposes)
const storedHashedValue =
  "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";

app.post("/verify", (req, res) => {
  const { textInput, hashedValue } = req.body;
  const calculatedHashValue = CryptoJS.SHA256(textInput).toString();

  if (hashedValue === storedHashedValue) {
    res.json({ result: "Verification Successful" });
  } else {
    res.json({ result: "Verification Failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
