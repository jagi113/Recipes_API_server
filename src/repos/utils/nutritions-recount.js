measure = (nutrition, amount) => {
    if (ingredient.unit == "g" || ingredient.unit == "ml") {
        return nutrition / 100 * amount
    } else if (ingredient.unit == "kg" || ingredient.unit == "l") {
        return nutrition * 10 * amount
    } else if (ingredient.unit == "pl") {
        return nutrition / 100 * 16 * amount
    } else if (ingredient.unit == "čl" || ingredient.unit == "kl") {
        return nutrition / 100 * 5 * amount
    } else {
        return nutrition * amount
    };
}

module.exports = (ingredients) => {
    ingredients.forEach(ingredient => {
        nutritions = ["kcal", "protein", "carbohydrate", "sugar", "fats", "saturated_fatty_acids", "transfatty_acids", "monounsaturated_fats", "polyunsaturated_fats", "cholesterol", "fiber", "salt", "water", "calcium", "phe"]
        nutritions.forEach(nutrition => ingredient[nutrition] = measure(ingredient[nutrition], ingredient.amount))
    });
    return ingredients
}