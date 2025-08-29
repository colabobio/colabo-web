import PropTypes from 'prop-types';

export function ConditionalComponent({ data, children, fallback }) {
	// If no data provided, show fallback or null
	if (!data) return fallback || null;

	// If array with no items
	if (Array.isArray(data) && !data.length) return fallback || null;

	// If object with no keys
	if (!Array.isArray(data) && typeof data === 'object' && Object.keys(data).length === 0) return fallback || null;
	
	return children;
}

ConditionalComponent.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	children: PropTypes.node.isRequired,
	fallback: PropTypes.node,
};

ConditionalComponent.defaultProps = {
	data: null,
	fallback: null,
};

export default ConditionalComponent;
