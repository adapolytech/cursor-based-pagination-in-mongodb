import express from "express";

export class App {
    /**
     * 
     * @param {Array<any>} controllers 
     */
    constructor(controllers) {
        this.app = express();
        this.init()
    }

    init(){
        this.app.get("/", (req, res, _next) => {
            return res.send({message: "Hello world"}).status(200)
        })
    }

    /**
     * 
     * @param {number} port 
     */
    appListen(port){
        this.app.listen(port, () => {
            console.log(`server listen at http://localhost:${port}`);  
        })
    }

}