import { app } from "./app.js";
import { mongoDB } from "./database/database.js";


mongoDB;
app.listen(process.env.PORT, () => {
    console.log(`Server is Running.. on ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})
