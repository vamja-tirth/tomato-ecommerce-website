import mongoose  from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://fooddel:fooddel@ac-18jyqi5-shard-00-00.3mtwivj.mongodb.net:27017,ac-18jyqi5-shard-00-01.3mtwivj.mongodb.net:27017,ac-18jyqi5-shard-00-02.3mtwivj.mongodb.net:27017/?ssl=true&replicaSet=atlas-6g00fd-shard-0&authSource=admin&appName=Cluster0").then(()=>console.log("DB Connected"))
        
    } catch (error) {
        console.log("DB Error:", error)
    }
}