/**
 * An array of routes accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings.
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for the API authentication routes.
 * Routes that start with this prefix are used for API authentication purpose.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default route to redirect to after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
