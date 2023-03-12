// import { Component } from 'react';

import { useState, useEffect } from 'react';

import shortid from 'shortid';

import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts
      ? contacts
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    console.log(name, number);

    if (contacts.filter(contact => contact.name === name).length >= 1) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.filter(contact => contact.number === number).length >= 1) {
      alert(`${number} is already in contacts`);
      return;
    }

    setContacts(prevContact => {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };
      return [newContact, ...prevContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    return result;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <Section title="Phonebook">
        <Form addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <Contacts contacts={filteredContacts} onDelete={deleteContact} />
      </Section>
    </>
  );
};

export default App;

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem('my-contacts'));
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate() {
//     const { contacts } = this.state;
//     localStorage.setItem('my-contacts', JSON.stringify(contacts));
//   }

//   addContact = ({ name, number }) => {
//     console.log(name, number);

//     if (
//       this.state.contacts.filter(contact => contact.name === name).length >= 1
//     ) {
//       alert(`${name} is already in contacts`);
//       return;
//     }
//     if (
//       this.state.contacts.filter(contact => contact.number === number).length >=
//       1
//     ) {
//       alert(`${number} is already in contacts`);
//       return;
//     }

//     const newContact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     this.setState(prevState => ({
//       contacts: [newContact, ...prevState.contacts],
//     }));
//   };

//   deleteContact = id => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(contact => contact.id !== id),
//       };
//     });
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.target.value });
//   };

//   render() {
//     const { addContact, addNumber, deleteContact, changeFilter } = this;

//     const { filter, contacts } = this.state;

//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );

//     return (
//       <>
//         <Section title="Phonebook">
//           <Form addContact={addContact} addNumber={addNumber} />
//         </Section>
//         <Section title="Contacts">
//           <Filter value={filter} onChange={changeFilter} />
//           <Contacts contacts={filteredContacts} onDelete={deleteContact} />
//         </Section>
//       </>
//     );
//   }
// }

// export default App;
