import C from '../constants'
import { combineReducers } from 'redux'

export const recipes = (state=[], action) => {

  // acts on an ARRAY of recipes
  let newRecipes = state.slice()
  switch (action.type) {
    case C.CREATE_RECIPE:
      // create a new recipe with default values
      // no payload

      newRecipes.push({
              "title": "New Recipe",
              "ingredients": " - first ingredient \n - second ingredient"
      })

      return newRecipes;
      break;

    case C.UPDATE_RECIPE:
      // payload is an object with minimally the recipe index to update and any other
      // attributes to merge into the recipe.

      // expected payload {idx: integer, recipe: object}

      let targetRecipe = newRecipes[action.payload.idx]
      if (targetRecipe === undefined) {
        return undefined
      }

      // merge changes into recipe
      Object.assign(targetRecipe, action.payload.recipe)
      return newRecipes;
      break;

    case C.DESTROY_RECIPE:
      // expected payload: {idx: integer}

      // pull the doomed recipie out and return the changed array.
      newRecipes.splice(action.payload.idx, 1)
      return newRecipes;
      break;

    case C.DESTROY_ALL:
      return []
      break;

    default:
      return state;

  }
}

export default combineReducers({
  recipes
})
