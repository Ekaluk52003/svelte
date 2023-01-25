import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals, url }) => {
	let Page = url.searchParams.get('page') ? url.searchParams.get('page') : 1;
	let Search = url.searchParams.get('search') ? url.searchParams.get('search') : '';
	let q = `"${Search}"`;
	let Qfilter = `suggestion ~ ${q}`;

	const getReports = async () => {
		try {
			const reports = serializeNonPOJOs(
				await locals.pb.collection('reports').getList(Page, 100, {
					filter: Qfilter,
					sort: '-created',
					expand: 'requestor,owner'
				})
			);

			return reports;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	return {
		reports: getReports()
	};
};
