/*
a new recipe button
*/

import React from 'react';
import PropTypes from 'prop-types';

const NewRecipe = ({onAddRecipe = (f) => f}) => {
  return (
    <div
      className="btn btn-lg btn-info"
      onClick={() => onAddRecipe()}
    >
      New
    </div>
  )

}


NewRecipe.propTypes = {
    onAddRecipe: PropTypes.func
}

export default NewRecipe
