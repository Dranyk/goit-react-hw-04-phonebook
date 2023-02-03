import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import ContactItem from './ContactItem/ContactItem';

const ContactsList = ({ contactList, onDelete  }) => (
  <ul className={css.contacts}>
    {contactList.map(item => (
      <ContactItem key={item.id} contact={item}  onDelete={onDelete} />
    ))}
  </ul>
);

ContactsList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ),
  onDelete: PropTypes.func.isRequired,
};

export default ContactsList;