import C from './constants';

export function addRecipe() {

  console.log("running addRecipe");
  return {
    type: C.CREATE_RECIPE
  }

}

export function editRecipe(idx, recipe) {
  // merge recpie attributes into an existing recipe at index

  console.log("running editRecipe");
  console.log(recipe);
  return {
    type: C.UPDATE_RECIPE,
    payload: {idx: idx, recipe: recipe}
  }
}
export function removeRecipe(idx) {
  // remove the recipe at idx

  console.log("removing at index " + idx);
  return {
    type: C.DESTROY_RECIPE,
    payload: {idx: idx}
  }
}

export function removeAll() {
  console.log("removing all recipes");
  return {
    type: C.DESTROY_ALL
  }
}
