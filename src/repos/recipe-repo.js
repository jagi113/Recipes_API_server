const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case')
const nutritionsRecount = require('./utils/nutritions-recount')

class RecipeRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM recipes LIMIT 100;');
        return toCamelCase(rows);
    }

    static async findOne({ slug }) {
        const recipe = (await pool.query("SELECT recipes.name, recipes.slug, recipes.url, recipes.photo FROM recipes WHERE slug = $1;", [slug])).rows;
        const tags = (await pool.query("SELECT tags.tag FROM tags WHERE recipe_slug = $1;", [slug])).rows;
        const instructions = (await pool.query("SELECT step, instruction, photo FROM instructions WHERE recipe_slug = $1", [slug])).rows;
        const ingredients = (await pool.query("SELECT * FROM recipe_ingredients LEFT JOIN ingredient_nutritions ON recipe_ingredients.ingredient_slug = ingredient_nutritions.slug WHERE recipe_slug = $1", [slug])).rows;
        //Create nutrition_recount function!!!
        return { info: toCamelCase(recipe), tags: toCamelCase(tags), instructions: toCamelCase(instructions), ingredients: toCamelCase(ingredients) };
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