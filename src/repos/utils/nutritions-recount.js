measure = (nutrition, amount) => {
    return nutrition / 100 * amount
}

module.exports = (ingredients) => {
    ingredients.forEach(ingredient => {
        if (ingredient.unit == "g" || ingredient.unit == "ml") {
            nutritions = ["kcal", "protein", "carbohydrate", "sugar", "fats", "saturated_fatty_acids", "transfatty_acids", "monounsaturated_fats", "polyunsaturated_fats", "cholesterol", "fiber", "salt", "water", "calcium", "phe"]
            nutritions.forEach(nutrition => ingredient[nutrition] = measure(ingredient[nutrition], ingredient.amount))
        };
    });
    return ingredients
}