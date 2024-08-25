import { kqlLoad } from '$lib/server';
const HomeQuery = {
	query: 'page("home")',
	select: {
		id: true,
		title: true,
		intendedTemplate: true,
		// description: true,
		headline: true,
		subheadline: true
	}
};

const photographyQuery = {
	query: 'page("photography").children.listed',
	select: {
		id: true,
		title: true,
		cover: {
			query: 'page.content.cover.toFile',
			select: {
				resized: {
					query: 'file.resize(1024, 1024)',
					select: {
						url: true
					}
				},
				alt: true
			}
		},
		image: {
			query: 'page.images.first',
			select: {
				resized: {
					query: 'file.resize(1024, 1024)',
					select: {
						url: true
					}
				},
				alt: true
			}
		}
	}
};

export const load = async ({fetch}) => {
	const home = kqlLoad(HomeQuery);
	const photography = kqlLoad(photographyQuery, {
		fetch
	});
	return {
		home,
		photography
	};
};
