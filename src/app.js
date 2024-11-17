import cors from "cors";
import express from "express";

export class App {
    app = express();

    /**
     * 
     * @param {Array<any>} controllers 
     */
    constructor(controllers) {
        this.init_middlewares()
        this.init(controllers)
    }

    init_middlewares() {
        this.app.use(express.json({ limit: "5mb" }));
        this.app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], credentials: true }))
    }
    /**
     * 
     * @param {Array<any>} controllers 
     */
    init(controllers = []) {
        this.app.get("/", (_req, res, _next) => {
            return res.send({ message: "Hello world" }).status(200)
        })
        if (controllers.length) {
            controllers.forEach((controller) => {
                this.app.use(controller.path, controller.router)
            })
        }
    }

    /**
     * 
     * @param {number} port 
     */
    start(port) {
        this.app.listen(port, () => {
            console.log(`server listen at http://localhost:${port}`);
        })
    }


}