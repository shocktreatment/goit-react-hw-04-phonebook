import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
  <>
    <h1
      style={{
        fontSize: '700',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
      }}
    >
      {title}
    </h1>
    {children}
  </>
);

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
};
