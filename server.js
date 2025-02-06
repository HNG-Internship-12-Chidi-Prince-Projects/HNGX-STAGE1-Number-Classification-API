// Code by Dev-X (HNG!2 Stage 1 Task)

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const NodeCache = require("node-cache");

const app = express();
const PORT = process.env.PORT || 5500;

// Enable and handle CORS
app.use(cors());

// Initialize cache with a 5-minute TTL
const cache = new NodeCache({ stdTTL: 300 });

// Function to check if a number is prime
const isNum_prime = (num) => {
  if (num < 2) return false;
  if (num % 2 === 0) return num === 2;
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if a number is perfect
const isNum_perfect = (num) => {
  if (num < 2) return false;
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
};

// Function to get a fun fact from Numbers API
const getFunFact = async (num) => {
  const cacheKey = `funFact-${num}`;
  const cachedFact = cache.get(cacheKey);

  if (cachedFact) {
    return cachedFact;
  }

  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
    const funFact = response.data.text || `No fun fact available for ${num}.`;
    cache.set(cacheKey, funFact);
    return funFact;
  } catch (error) {
    return `Oops.. ${num} fun fact is unavailable.`;
  }
};

// Route to classify number
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number, 10);

  // Validate input
  if (isNaN(num)) {
    return res.status(400).json({ number: "alphabet", error: true });
  }

  // Determine properties in parallel
  const [isPrime, isPerfect, isArmstrongNum, funFact] = await Promise.all([
    isNum_prime(num),
    isNum_perfect(num),
    isArmstrong(num),
    getFunFact(num),
  ]);

  const properties = [];
  if (isArmstrongNum) {
    properties.push("armstrong");
  }
  properties.push(num % 2 === 0 ? "even" : "odd");

  // Return JSON response
  res.json({
    number: num,
    is_prime: isPrime,
    is_perfect: isPerfect,
    properties,
    digit_sum: num
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0),
    fun_fact: funFact,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});