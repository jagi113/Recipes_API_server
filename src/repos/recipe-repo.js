const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case')

class RecipeRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM recipes LIMIT 100;');
        return toCamelCase(rows);
    }

    static async findById(id) {
        const recipe = (await pool.query("SELECT recipes.name, recipes.url, recipes.photo FROM recipes WHERE id = $1;", [id])).rows;
        const tags = (await pool.query("SELECT tags.tag FROM tags WHERE recipe_id = $1;", [id])).rows;
        const instructions = (await pool.query("SELECT step, instruction, photo FROM instructions WHERE recipe_id = $1", [id])).rows;
        const ingredients = (await pool.query("SELECT * FROM recipe_ingredients LEFT JOIN ingredient_nutritions ON recipe_ingredients.ingredient_id = ingredient_nutritions.id WHERE recipe_id = $1", [id])).rows;
        //Create nutrition_recount function!!!
        return { info: toCamelCase(recipe)[0], tags: toCamelCase(tags), instructions: toCamelCase(instructions), ingredients: toCamelCase(ingredients) };
    }

    /*
    static async insert(username, bio) {
        const {rows} = await pool.query("INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;", [username, bio]);
        return toCamelCase(rows)[0];
    }

    static async update(id, username, bio) {
        const {rows} = await pool.query("UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;", [username, bio, id]);
        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const {rows} = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *;", [id]);
        return toCamelCase(rows)[0];
    }

    */
}

module.exports = RecipeRepo;