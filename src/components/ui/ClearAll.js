/*
a button to clear out the store when clicked.
*/

import React from 'react';
import PropTypes from 'prop-types';

const ClearAll = ({onRemoveAll = (f) => f}) => {
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
