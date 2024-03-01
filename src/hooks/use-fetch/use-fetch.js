import { useEffect, useState } from 'react';
import { PROMISE_STATES } from '@utils/constants';

const useFetch = (fetchFunction) => {
	const [loading, setLoading] = useState(PROMISE_STATES.idle);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const fetchData = async (...args) => {
		try {
			setLoading(PROMISE_STATES.pending);

			setData(await fetchFunction(...args));

			setLoading(PROMISE_STATES.fulfilled);
		} catch (unknownError) {
			setLoading(PROMISE_STATES.rejected);
			if (unknownError instanceof Error) {
				setError(unknownError);
			} else {
				setError(new Error(String(unknownError)));
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		loading,
		error,
		data,
	};
};

export default useFetch;
