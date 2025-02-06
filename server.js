// Code by Dev-X (HNG!2 Stage 1 Task)

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5500;

// Enable and handle CORS
app.use(cors());

// Function to check if a number is prime
const isNum_prime = (num) => {
  if (num < 2) return false;
  if (num === 2) return true; // Special case for 2
  if (num % 2 === 0) return false; // Eliminate even numbers
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if a number is perfect
const isNum_perfect = (num) => {
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num && num !== 1;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  let sum = 0;
  for (const digit of digits) {
    sum += Math.pow(digit, power);
  }
  return sum === num;
};

// Function to get a fun fact from Numbers API
const getFunFact = async (num) => {
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
    return response.data.text || `No fun fact available for ${num}.`;
  } catch (error) {
    return `Oops.. ${num} fun fact is unavailable.`;
  }
};

// Route to classify number (Fast Response with Pseudo Fun Fact)
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number, 10);

  if (isNaN(num)) {
    return res.status(400).json({ number: "alphabet", error: true });
  }

  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  // Initial pseudo fun fact
  const pseudoFunFact = `Did you know? ${num} is an interesting number!`;

  res.json({
    number: num,
    is_prime: isNum_prime(num),
    is_perfect: isNum_perfect(num),
    properties,
    digit_sum: [...num.toString()].reduce((acc, digit) => acc + parseInt(digit, 10), 0),
    fun_fact: pseudoFunFact, // Send pseudo fun fact immediately
  });

  // Fetch the real fun fact in the background and let the client replace it
  getFunFact(num).then((realFunFact) => {
    console.log(`Updated Fun Fact for ${num}: ${realFunFact}`);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
