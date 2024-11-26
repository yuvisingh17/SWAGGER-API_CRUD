const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3113;

const SECRET_KEY = 'MY_SECRET_KEY'; // JWT secret key

// Function to get all route files in the "routes" directory
function getAllFilesInRoutes() {
  const routesDir = path.join(__dirname, 'routes');
  return new Promise((resolve, reject) => {
    fs.readdir(routesDir, (err, files) => {
      if (err) {
        reject('Unable to scan directory: ' + err);
      } else {
        // Remove file extensions to get route names
        const fileNamesWithoutExtension = files.map(file => file.split('.').slice(0, -1).join('.'));
        resolve(fileNamesWithoutExtension);
      }
    });
  });
}

// Swagger options
let options = {
  explorer: true,
  plugins: ["topbar"],
  customSiteTitle: "Ottonomy.io",
  customfavIcon: "https://testnoc.ottonomy.io/favicon.png",
  customCssUrl: '/custom.css',
  filter: true,
  swaggerOptions: {
    swaggerDefinition: {
      openapi: '3.0.0',  // OpenAPI 3.0 version
      basicAuth: {
        name: 'lion',
        schema: {
          type: 'basic',
          in: 'header'
        },
        value: 'Basic <lion:password>'
      }
    }
  },
  urls: [],
  validatorUrl: null,
};

// Dynamically load Swagger API routes from "routes" folder
getAllFilesInRoutes()
  .then(routes => {
    // Dynamically update the URLs array for Swagger UI
    options.swaggerOptions.urls = routes.map(route => ({
      url: `/docs/${route}`, // Path to the Swagger docs for each route
      name: route // The route name (e.g., user, order, etc.)
    }));
    // Setup Swagger UI with the dynamically generated URLs
    app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));
  })
  .catch(err => console.error(err));

// Serve Swagger docs for a specific route file and specific API endpoint
app.get("/docs/:id/:apiPath", (req, res) => {
  let { id, apiPath } = req.params;

  // Generate Swagger docs dynamically based on the route file
  const swaggerSpec = swaggerJsDoc({
    swaggerDefinition: {
      openapi: '3.0.0',
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      servers: [
        {
          url: 'http://localhost:3000', // Update if your server URL changes
        },
      ],
    },
    apis: [`./routes/${id}.js`], // Point to the specific route file
  });

  // Swagger documentation for all APIs in the file
  const allApis = swaggerSpec.paths;

  // Now filter for the specific API within the route file
  const filteredApi = allApis[`/${api}`];

  if (filteredApi) {
    return res.json({
      paths: {
        [`/${api}`]: filteredApi, // Only return the specific API
      },
    });
  } else {
    return res.status(404).json({ error: 'API not found' });
  }
});

// Start the Express server
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
  }
});
