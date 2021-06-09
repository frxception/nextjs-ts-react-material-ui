 // @ts-ignore
import { serialize, parse } from 'cookie';

const MAX_AGE = 24*60*60; // 1 day

/**
 * setTokenCookie
 * @param res 
 * @param name 
 * @param value 
 */
export const setTokenCookie = (res: any, name: string, value: any): void => {
    const cookie = serialize(name, value, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
    res.setHeader('Set-Cookie', cookie)
}

/**
 * getTokenCookie
 * @param req 
 * @param name 
 * @returns 
 */
export const getTokenCookie = (req: any,  name: string): any => {
    const cookies = parseCookies(req)
    // @ts-ignore
    return cookies[name]
}

/**
 * removeTokenCookie
 * @param res 
 * @param name 
 */
export const removeTokenCookie = (res: any, name: string): void => {
    const cookie = serialize(name, '', {
        maxAge: -1,
        path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
}

/**
 * parseCookies
 * @param req 
 * @returns 
 */
export const parseCookies = (req: any): void => {
    if (req.cookies) return req.cookies
    const cookie = req.headers?.cookie

    return parse(cookie || '')
}
