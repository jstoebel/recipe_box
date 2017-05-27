import RecipeUi from '../ui/Recipe';
import { connect } from 'react-redux'
import { removeRecipe, editRecipe } from '../../actions'

const mapDispatchToProps = {
  destroyRecipe: removeRecipe,
  updateRecipe: editRecipe
}

export default connect(null, mapDispatchToProps)(RecipeUi)
