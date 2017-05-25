/*
a new recipe button
*/

import React, { PropTypes } from 'react';

const NewRecipe = ({onAddRecipe = (f) => f}) => {
  console.log("render for NewRecipe ui");
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
