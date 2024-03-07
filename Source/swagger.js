import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Library API",
      version: "1.0.0",
      description: "",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Members",
        description: "Endpoints related to members",
      },
      {
        name: "Books",
        description: "Endpoints related to books",
      },
      {
        name: "Loans",
        description: "Endpoints related to loans",
      },
    ],
  },
  apis: ["./Source/Routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
