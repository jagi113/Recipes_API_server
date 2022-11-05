measure = (nutrition, ingredient) => {
    unit = ingredient.unit
    amount = ingredient.amount
    if (unit == "g" || unit == "ml") {
        return nutrition / 100 * amount
    } else if (unit == "kg" || unit == "l") {
        return nutrition * 10 * amount
    } else if (unit == "pl") {
        return nutrition / 100 * 16 * amount
    } else if (unit == "čl" || unit == "kl") {
        return nutrition / 100 * 5 * amount
    } else {
        return nutrition * amount
    };
}

module.exports = (ingredients) => {
    ingredients.forEach(ingredient => {
        nutritions = ["kcal", "protein", "carbohydrate", "sugar", "fats", "saturated_fatty_acids", "transfatty_acids", "monounsaturated_fats", "polyunsaturated_fats", "cholesterol", "fiber", "salt", "water", "calcium", "phe"]
        nutritions.forEach(nutrition => ingredient[nutrition] = measure(ingredient[nutrition], ingredient))
    });
    return ingredients
}