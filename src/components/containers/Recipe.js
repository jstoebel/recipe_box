import RecipeUi from '../ui/Recipe';
import { connect } from 'react-redux'
import { removeRecipe } from '../../actions'

const mapDispatchToProps = {
  destroyRecipe: removeRecipe
}

export default connect(null, mapDispatchToProps)(RecipeUi)
