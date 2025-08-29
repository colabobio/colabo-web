/* eslint-disable no-param-reassign */
export const getShuffleVersion = (array) => {
	const resArr = [...array];
	for (let i = resArr.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = resArr[i];
		resArr[i] = resArr[j];
		resArr[j] = temp;
	}
	return resArr;
};

export const groupBy = (xs, key) =>
	xs.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});

export const getHeroData = (heroData, heroName) => {
	const data = heroData.heros.nodes.find(
		(hero) => hero.childMarkdownRemark.frontmatter.page === heroName,
	).childMarkdownRemark.frontmatter;

	const { img, description } = data;
	return { img, description };
};

export const formatDate = (timestamp) => {
	if (!timestamp) return timestamp;

	const date = new Date(timestamp);

	const options = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	};

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

	return formattedDate.replace(/(\d+)([a-zA-Z]+),(\d+)/, '$2 $1, $3');
};

export const getPostByGuid = (guid, images) => {
	if (!guid || images.length <= 0) return null;

	return images?.find((image) => image.guid === guid);
};

export const getGuidFromLink = (link) => {
	if (!link) return null;

	// Medium GUIDs can have different formats
	// Try to extract the last segment of the URL which often contains the unique identifier
	let guid = link.split('/').pop();
	
	// Handle both hyphenated and non-hyphenated formats
	// Return as-is since we're matching against the same format from markdown files
	return guid;
};

export const shuffleArray = (array) => {
	if (!Array.isArray(array) || array.length === 0) return [];

	const shuffledArray = [...array];

	for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
};
