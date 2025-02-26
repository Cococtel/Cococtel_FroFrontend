import { sequence } from 'astro:middleware';
import { verifyUserLoginStatus } from './features/auth/services/authService';

const protectedRoutes = ['/home', '/profile', '/scan', '/community'];
const publicRoutes = ['/register', '/'];

async function protectedRoutesMiddleware (context: any, next:any) {
    const pathname = context.url.pathname !== '/' ? context.url.pathname.replace(/\/$/, '') : context.url.pathname;

    if (protectedRoutes.includes(pathname)) {
        const token = context.cookies.get('auth-token');
        
        if (!token) {
            return context.rewrite(new Request(new URL("/", context.url), {
                headers: {
                    "x-redirect-to": context.url.pathname
                }
            }));
        }

        const tokenValue = token.value.startsWith('Bearer ') ? token.value : `Bearer ${token.value}`;
        const isValid = await verify(tokenValue);

        if (!isValid)
            return context.rewrite(new Request(new URL("/", context.url), {
                headers: {
                    "x-redirect-to": context.url.pathname
                }
            }));
    }
    return next();
}
async function publicRoutesMiddleware (context: any, next:any) {
    const pathname = context.url.pathname !== '/' ? context.url.pathname.replace(/\/$/, '') : context.url.pathname;

    if (publicRoutes.includes(pathname)) {
        const token = context.cookies.get('auth-token');
        
        if (token) {
            const tokenValue = token.value.startsWith('Bearer ') ? token.value : `Bearer ${token.value}`;
            const isValid = await verify(tokenValue);
            
            if (isValid) {
                return context.redirect('/home');
            }
        }
        return next();
    }

    return next();
}

export const onRequest = sequence(
    protectedRoutesMiddleware, 
    publicRoutesMiddleware
);

const verify = async (token: string) => {
    const response = await verifyUserLoginStatus(token);
    return response.data && response.data.verify && response.data.verify.data === "ok";
};
