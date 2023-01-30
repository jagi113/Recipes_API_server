const express = require('express');
const RecipeRepo = require('../repos/recipe-repo');

const router = express.Router();

router.get('/recipes', async (req, res) => {
    // Run a query to get all users
    const recipes = await RecipeRepo.find();

    res.set({
        'Content-Type': 'text/plain',
        'charset': 'utf-8'
    });

    // Send the result back to the person
    // who made this request
    res.send(recipes);
});

router.get('/recipes/:slug', async (req, res) => {
    res.set({
        'Content-Type': 'text/plain',
        'charset': 'utf-8'
    });

    const { slug } = req.params;
    const recipe = await RecipeRepo.findOne({ slug: slug });
    if (recipe) {
        res.send(recipe);
    } else {
        res.sendStatus(404);
    }
});

/*

router.post('/users', async (req, res) => {
    const {username, bio} = req.body;

    const user = await UserRepo.insert(username, bio);

    res.send(user);
});

router.put('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {username, bio} = req.body;
    const user = await UserRepo.update(id, username, bio);
    
    // we might not find user with that id
    if(user){
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    const user = await UserRepo.delete(id);
    
    // we might not find user with that id to delete
    if(user){
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});
*/

module.exports = router;