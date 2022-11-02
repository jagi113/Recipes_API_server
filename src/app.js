const express = require('express');
const recipesRouter = require('./routes/recipes');

module.exports = () => {
    const app = express();
    app.use(express.json());
    app.use(recipesRouter);

    return app;
};