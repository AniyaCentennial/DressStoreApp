// console.log("Server is starting...");

// import express from 'express';
// import config from './config/config.js';
// //import app from './server/express.js';
// import mongoose from 'mongoose';
// import productRouter from './server/routes/product.routes.js'

// const app = express();
// // Middleware to log raw body
// app.use((req, res, next) => {
//   req.on('data', chunk => {
//     console.log(chunk.toString());
//   });
//   next();
// });

// // Middleware to parse JSON bodies
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Middleware function called');
//   console.log('Path:', req.path);
//   next();
// });

// mongoose.connect(config.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
//   .then(() => {
//     console.log("Connected to the database!");

//     app.use('/api', productRouter);
    
//     app.listen(config.port, () => {
//       console.info('Server started on port %s.', config.port);
//       console.info('URI %s.', config.mongoUri);
//     });

//   })
//   .catch(err => {
//     console.error(`Unable to connect to database: ${config.mongoUri}`, err);
//     process.exit(1); // Optional: Exit the application if database connection fails
//   });

// mongoose.connection.on('error', err => {
//   console.error(`Database connection error: ${err}`);
// });

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Dress Store application." });
// });


import express from 'express';
import config from './config/config.js';
import mongoose from 'mongoose';
import productRouter from './server/routes/product.routes.js'

const app = express();

// Middleware to log raw JSON body and parse it
app.use(express.raw({ type: 'application/json' }));
app.use((req, res, next) => {
  if (req.body) {
    console.log('Raw JSON body:', req.body.toString());
  }
  next();
});

// Convert raw body back to JSON
app.use(express.json({ type: () => true }));

app.use((req, res, next) => {
  console.log('Middleware function called');
  console.log('Path:', req.path);
  next();
});

mongoose.connect(config.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the database!");

    app.use('/api', productRouter);
    
    app.listen(config.port, () => {
      console.info('Server started on port %s.', config.port);
      console.info('URI %s.', config.mongoUri);
    });

  })
  .catch(err => {
    console.error(`Unable to connect to database: ${config.mongoUri}`, err);
    process.exit(1);
  });

mongoose.connection.on('error', err => {
  console.error(`Database connection error: ${err}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dress Store application." });
});


