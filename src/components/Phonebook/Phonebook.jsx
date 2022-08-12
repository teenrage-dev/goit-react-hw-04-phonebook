import './Phonebook.css';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Phonebook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('phonebook')) || []
  );
  const [filter, setFilter] = useState('');

  const LOCALSTORAGE_KEY = 'phonebook';

  // submit and add to local storage
  const handleSubmit = newContact => {
    // console.log(newContact);
    const { name, number } = newContact;
    const contact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contact) {
      showMessage(`Contact ${name} already exists`);
      return;
    }
    const newContacts = [...contacts, { name, number, id: nanoid() }];
    setContacts(newContacts);
    saveToLocalStorage(newContacts);
    return setContacts(parseContactsFromLocalStorage());
  };

  // parse contacts from local storage
  const parseContactsFromLocalStorage = () => {
    const parseContactsFromLocalStorage = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY)
    );

    return parseContactsFromLocalStorage;
  };

  // save to local storage
  const saveToLocalStorage = contacts => {
    // console.log('saveToLocalStorage');
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
  };

  // change filter by name
  const handleChangeFilterByName = event => {
    const { value } = event.target;
    setFilter(value);
  };

  // get filtered contacts
  const getFIlteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // delete contact
  const onDeleteContact = contact => {
    const newContacts = contacts.filter(c => c.id !== contact.id);
    setContacts(newContacts);
    saveToLocalStorage(newContacts);
    return setContacts(parseContactsFromLocalStorage());
  };

  // show message(error)
  function showMessage(message) {
    Notify.warning(message);
  }

  const renderList = getFIlteredContacts();

  return (
    <div className="phonebook_box">
      <h2>Phonebook</h2>
      <ContactForm handleSubmit={handleSubmit} showMessage={showMessage} />
      <div className="phonebook__contacts">
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          handleChangeFilterByName={handleChangeFilterByName}
        />
        <ContactList
          renderList={renderList}
          onDeleteContact={onDeleteContact}
        />
      </div>
    </div>
  );
};

// export class PhonebookOld extends Component {
//   state = {
//     // contacts:
//     contacts: JSON.parse(localStorage.getItem('phonebook')) || [],
//     filter: '',
//     LOCALSTORAGE_KEY: 'phonebook',
//   };

//   // submit and add to local storage
//   handleSubmit = newContact => {
//     // console.log(newContact);
//     const { contacts } = this.state;
//     const { name, number } = newContact;
//     const contact = contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (contact) {
//       this.showMessage(`Contact ${name} already exists`);
//       return;
//     }
//     const newContacts = [...contacts, { name, number, id: nanoid() }];
//     this.setState({ contacts: newContacts });
//     this.saveToLocalStorage(newContacts);
//     return this.setState({
//       contacts: this.parseContactsFromLocalStorage(),
//     });
//   };

//   // parse contacts from local storage
//   parseContactsFromLocalStorage = () => {
//     const parseContactsFromLocalStorage = JSON.parse(
//       localStorage.getItem('phonebook')
//     );
//     return parseContactsFromLocalStorage;
//   };

//   // save to local storage
//   saveToLocalStorage = contacts => {
//     console.log('saveToLocalStorage');
//     localStorage.setItem(this.state.LOCALSTORAGE_KEY, JSON.stringify(contacts));
//   };

//   // change filter by name
//   handleChangeFilterByName = event => {
//     console.log(event.target.name);
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   // get filtered contacts
//   getFIlteredContacts = () => {
//     const { contacts, filter } = this.state;
//     if (!filter) {
//       return contacts;
//     }
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   // show message(error)
//   showMessage(message) {
//     Notify.warning(message);
//   }

//   //delete contact from local storage
//   // onDeleteContactLocal = contact => {
//   //   const { contacts } = this.state;
//   //   // delete contact from local storage
//   //   this.setState({
//   //     contacts: contacts.filter(c => {
//   //       console.log(c);
//   //       return c.id !== contact.id;
//   //     }),
//   //   });

//   // }

//   // delete contact
//   onDeleteContact = contact => {
//     const { contacts } = this.state;
//     const newContacts = contacts.filter(c => c.id !== contact.id);
//     this.setState({ contacts: newContacts });
//     this.saveToLocalStorage(newContacts);
//     return this.setState({
//       contacts: this.parseContactsFromLocalStorage(),
//     });
//   };

//   render() {
//     const renderList = this.getFIlteredContacts();
//     return (
//       <div className="phonebook_box">
//         <h2>Phonebook</h2>
//         <ContactForm handleSubmit={this.handleSubmit} />
//         <div className="phonebook__contacts">
//           <h2>Contacts</h2>
//           <Filter
//             filter={this.state.filter}
//             handleChangeFilterByName={this.handleChangeFilterByName}
//           />
//           <ContactList
//             renderList={renderList}
//             onDeleteContact={this.onDeleteContact}
//           />
//         </div>
//       </div>
//     );
//   }
// }
