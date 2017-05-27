import NewRecipeUi from '../ui/NewRecipe'
import { connect } from 'react-redux'
import { addRecipe } from '../../actions'

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe() {
      dispatch(
        addRecipe()
      )
    }
  }
}

export default connect(null,mapDispatchToProps)(NewRecipeUi)
