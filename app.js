const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const jwt = require('jsonwebtoken');//jwt
const passport = require('passport');
const passportJWT = require('passport-jwt');//

const app = express();
const PORT = process.env.PORT || 3113;
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const SECRET_KEY = 'MY_SECRET_KEY';//jwt secret key


function getAllFilesInRoutes() {
  const routesDir = path.join(__dirname, 'routes');
  return new Promise((resolve, reject) => {
    fs.readdir(routesDir, (err, files) => {
      if (err) {
        reject('Unable to scan directory: ' + err);
      } else {
        const fileNamesWithoutExtension = files.map(file => file.split('.').slice(0, -1).join('.'));
        resolve(fileNamesWithoutExtension);
      }
    });
  });
}
let options = {      
  explorer: true,
  
  plugins:["topbar"],
  customSiteTitle: "Swagger CRUD API",
  
  customCssUrl: '/custom.css',
  filter: true,
    
  swaggerOptions: {
    swaggerDefinition: {
      openapi: '3.0.0',  // OpenAPI 3.0 version
      basicAuth: {
        name:   'lion',
        schema: {
          type: 'basic',
          in:   'header'
        },
        value:  'Basic <lion:password>'
      }
    }
  },
  urls:[],
  validatorUrl: null,
    
  };
getAllFilesInRoutes()
  .then(routes => {
    options.swaggerOptions.urls = routes.map(route => ({
      url: `/docs/${route}`,
      name: route
    }))
    app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null,options));
  })
  .catch(err => console.error(err));

// Serve swagger docs
app.get("/docs/:id", (req, res) => 
{
  let id = req.params.id
  return res.json(swaggerJsDoc({
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
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [`./routes/${id}.js`]
}

))
});

app.get("/docs", (req, res) => 
  {
    let id = req.query.id
    let apiPath = req.query.apiPath
    console.log(id,apiPath,"paTH")
    const allApi=swaggerJsDoc({
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
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: [`./routes/${id}.js`]
  }
  
  )
   // Swagger documentation for all APIs in the file
   const allApiPaths = allApi.paths;
   const filteredpath= {};
   Object.keys(allApiPaths).forEach((path) => {
    if (path.startsWith(apiPath)){
      filteredpath[path] = allApiPaths[path];
    }
  
  });
  let filterApi ={
    ...allApi,
    paths: filteredpath
  }
  console.log("hi i am path",filterApi)
  if (Object.keys(filterApi.paths).length ===0){
    return res.status(404).json({message:"no api doc"})
  }
  console.log("hi i worked ")
  // res.send(swaggerUi.generateHTML(filterApi))
    // res.send(swaggerUi.generateHTML(filterApi))
    return res.json(filterApi)

})

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  else{
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
  }
 
});

