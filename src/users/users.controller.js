import express, { Router } from "express";
import { UsersRepository } from "./users.repository.js";
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
        const insertedId = await UsersRepository.insertOne(data);
        (res.success({ insertedId }))
    }

    /**
    * 
    * @param {express.Request} req 
    * @param {express.Response} res 
    * @param {express.NextFunction} _next 
    */
    async all(req, res, _next) {
        const users = await UsersRepository.find();
        (res.success({ users }))
    }

}