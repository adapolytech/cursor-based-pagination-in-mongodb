import express, { Router } from "express";
import { UsersService } from "./users.service.js";
export class UsersController {
    /**
     * @type {express.Router}
     */
    router = new Router()
    path = "/users"

    constructor() {
        this.router.post("/", this.register);
        this.router.get("/", this.all)
    }

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} _next 
     */
    async register(req, res, _next) {
        const data = { ...req.body }
        const insertedId = await UsersService.insertOne(data);
        (res.success({ insertedId }))
    }

    /**
    * 
    * @param {express.Request} req 
    * @param {express.Response} res 
    * @param {express.NextFunction} _next 
    */
    async all(req, res, _next) {
        const query = { ...req.query, ...req.params }
        const users = await UsersService.find(query);
        (res.success({ users }))
    }

}