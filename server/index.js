const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const errorMiddleware = require('./controllers/middleware/errorMiddleware');

const logger = require('./logger');

const registerRoutes = require('./controllers/routes/authRegister');
const logInRoutes = require('./controllers/routes/authLogIn');
const getUserRoutes = require('./controllers/routes/getUser');

const getNotesRoutes = require('./controllers/routes/getNotes');
const getNoteRoutes = require('./controllers/routes/getNote');
const addNoteRoutes = require('./controllers/routes/addNote');
const checkNoteRoutes = require('./controllers/routes/checkNote');
const deleteNoteRoutes = require('./controllers/routes/deleteNote');
const updateNoteRoutes = require('./controllers/routes/updateNote');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(registerRoutes);
app.use(logInRoutes);
app.use(getUserRoutes);

app.use(getNotesRoutes);
app.use(getNoteRoutes);
app.use(addNoteRoutes);
app.use(checkNoteRoutes);
app.use(deleteNoteRoutes);
app.use(updateNoteRoutes);
app.use(errorMiddleware);


const PORT = process.env.PORT || 8080;


async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    logger.error(e);
  }
}

start();

