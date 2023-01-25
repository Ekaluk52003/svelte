import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals, url }) => {
	let Page = url.searchParams.get('page') ? url.searchParams.get('page') : 1;
	let Search = url.searchParams.get('search') ? url.searchParams.get('search') : '';
	let q = `"${Search}"`;
	let Qfilter = `name ~ ${q}`;

	const getProjects = async () => {
		try {
			const projects = serializeNonPOJOs(
				await locals.pb.collection('projects').getList(Page, 3, {
					filter: Qfilter,
					sort: '-created'
				})
			);
			console.log(projects);
			return projects;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	return {
		myprojects: getProjects()
	};
};
