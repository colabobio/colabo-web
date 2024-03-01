/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const createHeaders = () => {
	const newHeaders = new Headers({
		'Cache-Control': 'no-cache',
		'Content-Type': 'application/json',
	});

	return newHeaders;
};

export default class APIRequest {
	async get(url = {}) {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: createHeaders(),
			});

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			const responseData = await response.json();
			return responseData;
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
}
