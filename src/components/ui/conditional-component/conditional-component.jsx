import PropTypes from 'prop-types';

export function ConditionalComponent({ data, children }) {
	if (!data) return null;

	if (Array.isArray(data) && !data.length) return null;

	return children;
}

ConditionalComponent.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	children: PropTypes.node.isRequired,
};

ConditionalComponent.defaultProps = {
	data: null,
};

export default ConditionalComponent;
