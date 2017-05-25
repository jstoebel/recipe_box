/*
a button to clear out the store when clicked.
*/

import React, { PropTypes } from 'react';

const ClearAll = ({onRemoveAll = (f) => f}) => {
  console.log("clear all recipes");
  return (
    <div
      className="btn btn-lg btn-danger"
      onClick={() => onRemoveAll()}
    >
      Clear All
    </div>
  )

}


ClearAll.propTypes = {
    onClearAll: PropTypes.func
}

export default ClearAll
