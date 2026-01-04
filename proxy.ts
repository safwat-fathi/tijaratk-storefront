import { i18nMiddleware } from './middlewares/i18n.middleware';

export default i18nMiddleware;

export const config = {
	matcher: [
		"/((?!api|static|.*\\..*|_next|favicon.ico|manifest.json|robots.txt).*)",
		"/api/((?!auth).*)",
	],
};
