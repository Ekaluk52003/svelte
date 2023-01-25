import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';

export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('https://wandering-bush-6330.fly.dev');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// if (event.url.pathname.startsWith('/projects')) {
	// 	if (!event.locals.user) {
	// 		console.log('rediret true');
	// 		throw redirect('/login');
	// 	}
	// }
	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	if (event.url.pathname.split('/')[1] == '' || event.url.pathname != '/login') {
		if (!event.locals.user && event.url.pathname != '/register') {
			return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
		}
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
