import React from 'react';
import PropTypes from 'prop-types';
import '../Phonebook.css';

export const Filter = ({ filter, handleChangeFilterByName }) => {
  return (
    <>
      <label htmlFor="filter" className="phonebook_name phonebook_name__filter">
        Find contacts by name
      </label>
      <input
        className="phonebook__input"
        type="text"
        name="filter"
        value={filter}
        onChange={handleChangeFilterByName}
      />
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChangeFilterByName: PropTypes.func.isRequired,
};
