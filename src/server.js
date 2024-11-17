import { App } from "./app.js";
import { DB } from "./db.js";
import { UsersController } from "./users/users.controller.js";

(function () {
    const db = new DB();
    db.on("success", () => {
        const app = new App([new UsersController()]);
        app.start(+process.env.PORT || 4000)

    }).on("error", async (error) => {
        await db.close_db()
        process.exit(-1)
    })

})();