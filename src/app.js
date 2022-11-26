const express = require('express');
const cors = require('cors');

const recipesRouter = require('./routes/recipes');

module.exports = () => {
    const app = express();
    app.use(cors());
    app.options('*', cors());
    app.use(express.json());
    app.use(recipesRouter);

    return app;
};