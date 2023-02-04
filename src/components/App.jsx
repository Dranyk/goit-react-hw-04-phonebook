import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import ContactsList from './ContactsList/ContactsList';
import Form from './Form/Form';
import Filter from './Filter/Filter';

const startData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const savedData = JSON.parse(localStorage.getItem('phonebook'));

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    savedData ? [...savedData] : startData
  );

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert('Contact is in phonebook');
    } else {
      const newContact = {
        id: nanoid(),
        name: data.name,
        number: data.number,
      };

      setContacts([...contacts, newContact]);
    }
  };

  const filterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();

  const showFilteredContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(normalizedFilter)
  );

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.container}>
      <div>
        <h1>Phonebook</h1>
        <Form onSubmitForm={addContact} />

        <h2>Contacts</h2>

        {showFilteredContacts.length > 0 || filter ? (
          <Filter value={filter} onChange={filterChange} />
        ) : (
          <p>No contacts added</p>
        )}

        <ContactsList
          contactList={showFilteredContacts}
          onDelete={handleDeleteContact}
        />
      </div>
    </div>
  );
}

// class oldApp extends Component {
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
//     const savedData = JSON.parse(localStorage.getItem('phonebook'));
//     if (savedData) {
//       this.setState({ contacts: savedData });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
//     }
//   }

// addContact = data => {
//   const { contacts } = this.state;

//   if (
//     contacts.some(
//       ({ name }) => name.toLowerCase() === data.name.toLowerCase()
//     )
//   ) {
//     alert('Contact is in phonebook');
//   } else {
//     const newContact = {
//       id: nanoid(),
//       name: data.name,
//       number: data.number,
//     };

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   }
// };

//   filterChange = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   showFilteredContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   handleDeleteContact = id => {
//     this.setState(({ contacts: prevContacts }) => ({
//       contacts: prevContacts.filter(({ id: contactId }) => contactId !== id),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     return (
//       <div className={css.container}>
//         <div>
//           <h1>Phonebook</h1>
//           <Form onSubmitForm={this.addContact} />

//           <h2>Contacts</h2>

//           {this.showFilteredContacts().length > 0 || filter ? (
//             <Filter value={filter} onChange={this.filterChange} />
//           ) : (
//             <p>No contacts added</p>
//           )}

//           <ContactsList
//             contactList={this.showFilteredContacts()}
//             onDelete={this.handleDeleteContact}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
