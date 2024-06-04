import mongoose from 'mongoose'

const URI = "mongodb+srv://admin:admin@healthapp.jnaeugr.mongodb.net/HealthAppData?retryWrites=true&w=majority&appName=HealthApp";

const dbConnection = async() => {

    try{
        await mongoose.connect(URI);
        console.log("Connected to the database successfully")

    }catch(error)
    {
        console.log("error in connecting to database" , error.message);
    }
}

export default dbConnection;
