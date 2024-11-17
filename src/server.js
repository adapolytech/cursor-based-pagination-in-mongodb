import { App } from "./app.js";
import { DB } from "./db.js";

(function () {
    const db = new DB();
    db.on("success", () => {
        const app = new App();
        app.appListen(+process.env.PORT || 4000)

    }).on("error", (error) => {
        db.close_db()
        process.exit(-1)
    })

})();