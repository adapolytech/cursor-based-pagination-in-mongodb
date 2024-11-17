import express from "express";

/**
 * 
 * @param {String} auth_header 
 * @returns 
 */
const extract_token = (auth_header) => {
    if (!auth_header) return null;
    return auth_header.slice(7)
}

/**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} _next 
     */
export function AuthMiddleware(req, res, next) {
    const token = extract_token(req.headers.authorization);
    // decode token and add user to req.user field
}
