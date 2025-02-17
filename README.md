﻿# Number Classification API

## Overview
The **Number Classification API** is a RESTful API that accepts a number as a query parameter and returns mathematical properties about the number along with a fun fact retrieved from the Numbers API.

## Features
- Determines if the number is **prime**
- Determines if the number is **perfect**
- Checks if the number is an **Armstrong number**
- Classifies the number as **odd or even**
- Computes the **sum of its digits**
- Fetches a **fun fact** from the Numbers API
- Returns responses in **JSON format**
- Handles **CORS (Cross-Origin Resource Sharing)**
- Provides proper **error handling**

## API Endpoint
### **GET /api/classify-number**
#### **Query Parameters**
- `number` (required): The number to be classified (must be a valid integer).

#### **Example Request**
```
GET https://stage-1-task-backend.vercel.app/api/classify-number?number=371
```

#### **Success Response (200 OK)**
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### **Error Response (400 Bad Request)**
```json
{
    "number": "invalid_input",
    "error": true
}
```

## Installation and Setup
1. **Clone the Repository**
```
git clone https://github.com/HNG-Internship-12-Chidi-Prince-Projects/HNGX-STAGE1-Number-Classification-API.git
```

2. **Navigate to the Project Directory**
```
cd HNGX-STAGE1-Number-Classification-API
```

3. **Install Dependencies**
```
npm install
```

4. **Run the Server**
```
node server.js
```
(Use `npx nodemon server.js` for auto-restart on changes.)

5. **Test Locally**
Open a browser or Postman and visit:
```
http://localhost:5500/api/classify-number?number=371
```

## Deployment
This API is deployed on **Vercel** and can be accessed publicly at:
```
https://stage-1-task-backend.vercel.app/api/classify-number?number=371
```

## Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **Axios** - HTTP requests (for fetching fun facts)
- **CORS** - Cross-Origin Resource Sharing

## Repository and Version Control
- **GitHub Repository:** [HNGX-STAGE1-Number-Classification-API](https://github.com/HNG-Internship-12-Chidi-Prince-Projects/HNGX-STAGE1-Number-Classification-API)
- Follow best practices for commits and branch management

## Testing and Validation
- Tested API response formats
- Ensured proper handling of invalid inputs
- Verified API speed and stability


## Author
**Chidi Prince**

For any issues or contributions, feel free to open a pull request or raise an issue!
