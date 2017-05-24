import RecipeBox from '../ui/RecipeBox'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {

  return {
    recipes: state.recipes
  }

}

const Container = connect(mapStateToProps)(RecipeBox)

export default Container
