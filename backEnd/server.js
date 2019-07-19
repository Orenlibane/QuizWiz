const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);

const quizRoutes = require('./api/quiz/quiz.routes');

const logger = require('./services/logger.service');
const socketService = require('./services/socket.service');

//SESSION
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

if (process.env.NODE_ENV !== 'production') {
  const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
  };
  app.use(cors(corsOptions));
}

// routes

app.use('/quiz', quizRoutes);

socketService.setup(http);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
}

const port = process.env.PORT || 3000;
http.listen(port, () => {
  logger.info(`Server is running on port:  ${port}`);
});
