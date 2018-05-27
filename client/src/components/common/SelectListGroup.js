import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = () => {
  return (
    <div className="form-group">
    
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;