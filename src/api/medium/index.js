/* eslint-disable import/prefer-default-export */
import APIRequest from '../api-request';

const getLatestPosts = async () => {
	try {
		const res = await new APIRequest().get(
			'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@colabobio',
		);
		
		// Check if the response has the expected structure
		if (res && res.items && Array.isArray(res.items)) {
			return res;
		} else {
			console.error('Medium API response is not in the expected format:', res);
			return { items: [] };
		}
	} catch (error) {
		console.error('Error fetching Medium posts:', error);
		return { items: [] };
	}
};

export const MEDIUM_API = {
	getLatestPosts,
};
