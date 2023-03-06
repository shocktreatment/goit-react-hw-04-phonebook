import PropTypes from 'prop-types';

import s from './filter.module.css';

const Filter = ({ value, onChange }) => (
  <label className={s.label}>
    Find contacts by name
    <input text="text" value={value} onChange={onChange} className={s.input} />
  </label>
);

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func,
};
