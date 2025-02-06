const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());

// Optimized function to check properties
const classifyNumber = (num) => {
  if (num < 2) return { is_prime: false, is_perfect: false, is_armstrong: false };

  let sum = 1, is_prime = true;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      is_prime = false;
      sum += i + (i !== num / i ? num / i : 0);
    }
  }

  return {
    is_prime,
    is_perfect: sum === num && num !== 1,
  };
};

// Route to classify number
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number, 10);

  if (isNaN(num)) return res.status(400).json({ number: "alphabet", error: true });

  // Extract digits
  const digits = num.toString().split("").map(Number);
  const digit_sum = digits.reduce((acc, digit) => acc + digit, 0);
  const power = digits.length;
  const is_armstrong = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0) === num;

  // Process number properties
  const { is_prime, is_perfect } = classifyNumber(num);
  const properties = [num % 2 === 0 ? "even" : "odd"];
  if (is_armstrong) properties.push("armstrong");

  // Fetch fun fact concurrently
  const funFactPromise = axios
    .get(`http://numbersapi.com/${num}/math?json`)
    .then((response) => response.data.text || `No fun fact available for ${num}.`)
    .catch(() => `Oops.. ${num} fun fact is unavailable.`);

  const fun_fact = await funFactPromise;

  res.json({
    number: num,
    is_prime,
    is_perfect,
    properties,
    digit_sum,
    fun_fact,
  });
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
