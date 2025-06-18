import React from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromOpenRouter } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "beef",
    "salt",
    "pepper",
    "buns",
  ]);
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function getRecipe() {
    try {
      setLoading(true); // Show loader
      const recipeMarkdown = await getRecipeFromOpenRouter(ingredients);
      setRecipe(recipeMarkdown.choices[0].message.content); // extract content here
    } catch (error) {
      console.error("Error getting recipe:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }
  function handleAddIngredient(e) {
    e.preventDefault(); // Prevent form reload
    const formData = new FormData(e.target);
    addIngredient(formData);
    e.target.reset(); // optional: clears the input field
  }
  function handleClearIngredients() {
    setIngredients([]);
    setRecipe("");
  }
  const showButton = ingredients.length >= 1;
  return (
    <main>
      <form onSubmit={handleAddIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />
        <button>Add ingredient</button>
      </form>
      {showButton && (
        <button onClick={handleClearIngredients} className="clearButton">
          clear ingredient
        </button>
      )}
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {loading && <p>Loading...</p>}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
