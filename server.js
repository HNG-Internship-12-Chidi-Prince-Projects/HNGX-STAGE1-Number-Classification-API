const express = require("express");
const cors = require("cors");
const axios = require("axios"); // ✅ Added axios import

const app = express();
app.use(cors());

app.get("/api/classify-number", async (req, res) => { // ✅ Made function async
    let { number } = req.query;

    // Validate input
    if (number === undefined || number.trim() === "") {
        return res.status(400).json({ error: true, number: "" });
    }
    if (isNaN(number)) {
        return res.status(400).json({ error: true, number });
    }

    number = Number(number);
    let properties = [];

    // Check if number is even or odd
    if (number % 2 === 0) {
        properties.push("even");
    } else {
        properties.push("odd");
    }

    // Check if number is prime
    const isPrime = checkPrime(number);

    // Check if number is a perfect number
    const isPerfect = checkPerfect(number);

    // Check if number is an Armstrong number
    if (isArmstrong(number)) {
        properties.push("armstrong");
    }

    // Calculate digit sum (absolute value for negatives)
    const digitSum = getDigitSum(number);

    // Fetch fun fact about the number
    let fun_fact;
    try {
        const response = await axios.get(`http://numbersapi.com/${number}/math?json`);
        fun_fact = response.data.text || `No fun fact available for ${number}.`;
    } catch (error) {
        fun_fact = `Oops.. ${number} fun fact is unavailable.`;
    }

    // Sort properties to ensure consistent ordering
    properties.sort();

    res.status(200).json({
        number,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digitSum,
        fun_fact,
    });
});

// Function to check if a number is prime
function checkPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is perfect
function checkPerfect(num) {
    if (num < 1) return false;
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Function to check if a number is an Armstrong number
function isArmstrong(num) {
    let sum = 0;
    let digits = Math.abs(num).toString().split("").map(Number);
    let power = digits.length;

    digits.forEach(digit => {
        sum += Math.pow(digit, power);
    });

    return sum === Math.abs(num);
}

// Function to compute the sum of digits (absolute value for negatives)
function getDigitSum(num) {
    return Math.abs(num)
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
