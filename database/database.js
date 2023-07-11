import mongoose from "mongoose";

export const mongoDB = mongoose.connect(process.env.MONGO_URI,{
    dbName:"BackendTodo",
})
    .then(() => {
        console.log("Connected to MondoDB");
    })
    .catch((e) => { console.log(e); })