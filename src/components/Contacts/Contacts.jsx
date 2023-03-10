import PropTypes from 'prop-types';

const Contacts = ({ contacts, onDelete }) => {
  return (
    <ul style={{ width: '250px' }}>
      {contacts.map(({ id, name, number }) => (
        <li
          key={id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p>
            {name}: {number}
          </p>
          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;

Contacts.defaultProps = {
  contacts: [],
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
