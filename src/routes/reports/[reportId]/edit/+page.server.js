import { error, invalid, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs, validateData } from '$lib/utils';
import { updateReportSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
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

	const getReport = async () => {
		try {
			const report = serializeNonPOJOs(
				await locals.pb.collection('reports').getOne(params.reportId)
			);
			if (locals.user.id === report.requestor) {
				return {
					report
				};
			} else {
				throw error(403, 'Forbidden');
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		report: getReport(),
		listUsers: getUsers()
	};
};

export const actions = {
	updateReport: async ({ request, locals, params }) => {
		const body = await request.formData();

		const bfImg = body.get('beforeImg');

		if (bfImg.size === 0) {
			body.delete('beforeImg');
		}
		body.append('status', 'OPENNED');


		const { formData, errors } = await validateData(body, updateReportSchema);

		const { beforeImg, ...rest } = formData;

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			console.log('bf update');
			await locals.pb.collection('reports').update(params.reportId, serialize(formData));
			console.log('af update');
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		console.log('redirect');

		throw redirect(303, `/`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('reports').update(params.reportId, { beforeImg: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
