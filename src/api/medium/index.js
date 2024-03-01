/* eslint-disable import/prefer-default-export */
import APIRequest from '../api-request';

const getLatestPosts = async () => {
	const res = await new APIRequest().get(
		'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@colabobio',
	);

	return res ?? null;
};

export const MEDIUM_API = {
	getLatestPosts,
};
