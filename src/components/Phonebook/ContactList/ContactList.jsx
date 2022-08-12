import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import '../Phonebook.css';

export const ContactList = ({ renderList, onDeleteContact }) => {
  // console.log(renderList);
  return (
    <>
      <ul className="phonebook__list">
        {renderList.map(contact => (
          <li key={nanoid()} className="phonebook__item">
            <span className="phonebook__item-text">
              {contact.name}: {contact.number}
            </span>
            <button
              className="phonebook_btn"
              onClick={() => onDeleteContact(contact)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  renderList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
