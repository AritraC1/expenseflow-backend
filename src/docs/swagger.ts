import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ExpenseFlow API",
      version: "1.0.0",
      description: "Expense tracking backend",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);