//code by Dev-X (HNG!2 stage 1 task)

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5500;

// this Enables and handles CORS
const cors = require("cors");
app.use(cors());


// function to check if input (number) is prime 
const isNum_prime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// function to check if input (number) is perfect
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

// function to check if number is an Armstrong number
const isArmstrong = (num) => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
};

// function to get a fun fact from Numbers API
const getFunFact = async (num) => {
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
    return response.data.text;
  } catch (error) {
    return `opps..${num} fun fact is unable to be reached.`;
  }
};

// route to classify number
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number, 10);
   
  // this will check number and return error if not valid
  if (isNaN(num)) {
    return res.status(400).json({ number : 'alphabet', error: true });
  }

  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  const funFact = await getFunFact(num); //get fun fact from the Numbers API


  //send JSON response to client side
  res.json({
    number: num,
    is_prime: isNum_prime(num),
    is_perfect: isNum_perfect(num),
    properties,
    digit_sum: num.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0),
    fun_fact: funFact,
  });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
