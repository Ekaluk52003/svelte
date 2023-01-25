import { error, invalid, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { createReportSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({ locals }) {
	const getUsers = async () => {
		try {
			const users = serializeNonPOJOs(
				await locals.pb.collection('users').getFullList(200, {
					sort: '-created'
				})
			);

			return users;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};
	return {
		listUsers: getUsers()
	};
}

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();

		const bfImg = body.get('beforeImg');

		if (bfImg.size === 0) {
			body.delete('beforeImg');
		}

		// if (afImg.size === 0) {
		// 	body.delete('afterImg');
		// }
		const record = await locals.pb.collection('caseId').getOne('q5hs89d3whvwf5a');
		body.append('caseId', record.numberID);
		const data = {
			numberID: record.numberID + 1
		};
		await locals.pb.collection('caseId').update('q5hs89d3whvwf5a', data);

		body.append('status', 'OPENNED');

		body.append('requestor', locals.user.id);

		const { formData, errors } = await validateData(body, createReportSchema);

		const { beforeImg, ...rest } = formData;

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('reports').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};
