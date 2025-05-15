import swaggerJSDoc from "swagger-jsdoc";


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de Gestión Contable - App",
      version: "1.0.0",
      description: "API documentation for the project",
    },
    servers: [
      {
        url: "http://localhost:3000", // Cambia esto a la URL de tu servidor
        description: "Local server",  
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Ruta a tus archivos de rutas  
};

const specs = swaggerJSDoc(swaggerOptions);
export default specs; // Exporta la documentación generada