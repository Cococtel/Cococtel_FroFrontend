import { defineMiddleware } from 'astro:middleware';
import { verifyUserLoginStatus } from './features/auth/services/authService';

// Ensure all protected routes are defined consistently
const protectedRoutes = ['/home', '/profile', '/scan', '/community'];

export const onRequest = defineMiddleware(async ({ cookies, url, redirect }, next) => {
  // Normalize pathname: remove trailing slash (except for root)
  const pathname = url.pathname !== '/' ? url.pathname.replace(/\/$/, '') : url.pathname;

  // For protected routes: if the token is missing or invalid, redirect to login ("/")
  if (protectedRoutes.includes(pathname)) {
    const token = cookies.get('auth-token');
    if (!token) {
      return redirect('/');
    }

    // If your GraphQL API requires the token to have a "Bearer " prefix, add it if missing:
    const tokenValue = token.value.startsWith('Bearer ') ? token.value : `Bearer ${token.value}`;

    const isValid = await verify(tokenValue);
    if (!isValid) {
      return redirect('/');
    }
    return next();
  }

  // For public routes like "/" and "/register": if a valid token exists, redirect to home
  if (['/register', '/'].includes(pathname)) {
    const token = cookies.get('auth-token');
    if (token) {
      const tokenValue = token.value.startsWith('Bearer ') ? token.value : `Bearer ${token.value}`;
      const isValid = await verify(tokenValue);
      console.log('isValid:', isValid);
      if (isValid) {
        return redirect('/home');
      }
    }
    return next();
  }

  return next();
});

const verify = async (token: string) => {
  const response = await verifyUserLoginStatus(token);
  console.log('Verify response:', response);
  // Check that the response structure and the expected value ("ok") match your API's response
  return response.data && response.data.verify && response.data.verify.data === "ok";
};
