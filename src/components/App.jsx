import { Component } from 'react';
import shortid from 'shortid';

import Section from './Section';
import Form from './Form/Form';
import Contacts from './Contacts';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: [],
  };

  addContact = ({ name, number }) => {
    console.log(name, number);

    if (
      this.state.contacts.filter(contact => contact.name === name).length >= 1
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (
      this.state.contacts.filter(contact => contact.number === number).length >=
      1
    ) {
      alert(`${number} is already in contacts`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { addContact, addNumber, deleteContact, changeFilter } = this;

    const { filter, contacts } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.includes(filter)
    );

    // НЕ ПРАЦЮЄ через toLowerCase <---------------------------------
    // ГОРИТЬ КОНСОЛЬ
    // const filteredContacts = contacts.filter(contact =>
    //   contact.name.toLowerCase().includes(filter.toLowerCase())
    // );

    return (
      <>
        <Section title="Phonebook">
          <Form addContact={addContact} addNumber={addNumber} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <Contacts contacts={filteredContacts} onDelete={deleteContact} />
        </Section>
      </>
    );
  }
}

export default App;
