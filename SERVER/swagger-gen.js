// Script to generate Swagger API documentation using swagger-autogen
import swaggerAutogen from "swagger-autogen";

// Swagger documentation configuration
const doc = {
  info: {
    title: "Learning Management System API",
    description: "API documentation for the LMS project",
  },
  host: "localhost:5010",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; // Output file for Swagger docs
const endpointsFiles = [
  "./app.js",
  "./Routes/user.routes.js",
  "./Routes/course.routes.js",
  "./Routes/miscellaneous.routes.js",
  "./Routes/payment.routes.js",
];

// Generate Swagger documentation
swaggerAutogen()(outputFile, endpointsFiles, doc);
