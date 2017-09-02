import jwtDecode from 'jwt-decode'

export default function ({ store, error, redirect, route, isServer, req }) {
    /*
    let token;
    let redirectURL = "/login";


    if (isServer) {
        if (route.query.token) {
            token = route.query.token;
        } else {
            const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("token="));
            if (jwtCookie) {
                token = jwtCookie.split('=')[1];
            }
        }
    } else {
        token = window.localStorage.token;
    }

    if (!token) {
        return redirect(redirectURL, { path: route.path })
    }

    let payload;
    try {
        payload = jwtDecode(token);
    } catch (error) {
        return redirect(redirectURL, { path: route.path })
    }

    let date = Date.now() / 1000;
    if (payload.exp < date) {
        return redirect(redirectURL, { path: route.path })
    }
    */

    if (!store.state.authUser) {
        return redirect('/login', { path: route.path })

        //     /*  
        //     error({
        //       message: 'You are not connected',
        //       statusCode: 403
        //     })
        //     */
    }
}
