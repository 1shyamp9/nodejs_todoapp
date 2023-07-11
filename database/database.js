import mongoose from "mongoose";

export const mongoDB = mongoose.connect(process.env.MONGO_URI,{
    dbName:"BackendTodo",
})
    .then((c) => {
        console.log(`Connected to MondoDB ${c.connection.host}`);
    })
    .catch((e) => { console.log(e); })