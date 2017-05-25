import RecipeBox from '../ui/RecipeBox'
import { connect } from 'react-redux'
import { addRecipe, editRecipe, removeRecipe, removeAll } from '../../actions'
const mapStateToProps = (state) => {

  return {
    recipes: state.recipes
  }

}

const Container = connect(mapStateToProps)(RecipeBox)

export default Container
