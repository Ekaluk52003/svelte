import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getProject = async (projectId) => {
		try {
			const response = await fetch(
				`https://wandering-bush-6330.fly.dev/api/collections/projects/records/${projectId}?expand=user,comments(project).user`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: locals.pb.authStore.token
					}
				}
			);
			const responseData = await response.json();
			// console.log('api res', responseData.expand['comments(project)']);
			console.log('api res', responseData);

			const project = serializeNonPOJOs(await locals.pb.collection('projects').getOne(projectId));
			return project;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		project: getProject(params.projectId)
	};
};
