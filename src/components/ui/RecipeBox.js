import React, { Component } from 'react';
import store from 'store';
import Recipe from './Recipe';
import NewRecipe from '../containers/NewRecipe';
import ClearAll from '../containers/ClearAll';

class RecipeBox extends Component {

    constructor() {
      super()
      this.clearAll = this.clearAll.bind(this);
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
      this.remove = this.remove.bind(this);
      this.render = this.render.bind(this);
      this.eachRecipe = this.eachRecipe.bind(this);
    }

    nextId() {
      //ask the store for the next id

      var largest = store.get("biggestID");
      if(largest == undefined){
        largest = -1;
      }

      var nextId = largest + 1;
      store.set("biggestID", nextId);
      return nextId;
    }

    clearAll(){
      //DANGER! clears all recipies from the store and sets biggestID to -1.
      store.set("recipes", []);
      store.set("biggestID", -1);
      this.forceUpdate();
    }

    componentWillMount() {
        //example of recipies:
        // {

        //   1: {title: "spam", ingredients: "text in markdown"},
        //   ...
        // }
      var pulledRecipes = store.get("recipes")

      if (pulledRecipes== undefined){
        store.set("recipes", [])
        return {recipes: []};
      } else {
        return {recipes: pulledRecipes};
      }

    }

    create() {
      //create a new blank recipie

      var arr = store.get("recipes")
      arr.push({
        id: this.nextId(),
        title: "New Recipe",
        ingredients: " - First ingredient \n - second ingredient"
      })
      store.set("recipes", arr)

      this.forceUpdate();
    }

    update(newTitle, newIngs, id) {

      var recipes = store.get("recipes")

      recipes[id].title = newTitle;
      recipes[id].ingredients = newIngs;
      store.set("recipes", recipes);
      this.forceUpdate();

    }

    remove(i) {
      var recipes = store.get("recipes");
      recipes.splice(i, 1);
      store.set("recipes", recipes)
      this.forceUpdate();

    }

    eachRecipe (recipe, i){

      var recipeId = "#recipe"+i;

      return (
          <Recipe
            index={i}
            key={recipe.id}
            data={recipe}
            recipeId={i}
            onChange={this.update}
            onRemove={this.remove}
          >
          </Recipe>


        )
    }

    render() {
        return(
            <div className="container">
              <NewRecipe/>
              <ClearAll/>
              <div className="panel-group" id="accordion">
                {this.props.recipes.map(this.eachRecipe)}
              </div>
            </div>
        )
    }
}

export default RecipeBox;
