import { auth as middleware } from "@/auth"
import { PUBLIC_ROUTES, Routes } from "@/routes"

export default middleware((req) => {
	const { nextUrl } = req;

	const isAuthenticated = !!req.auth;
	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	if (!isAuthenticated && !isPublicRoute)
		return Response.redirect(Routes.ROOT);
});


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}