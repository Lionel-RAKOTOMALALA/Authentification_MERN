import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
    try {
        // Création de l'instance MongoMemoryServer
        const mongod = await MongoMemoryServer.create({
            instance: {
                port: 27017, // Optionnel: spécifie un port spécifique
            },
            binary: {
                version: '4.4.0', // Optionnel: spécifie une version de MongoDB
            },
            timeout: 60000 // Augmentation du délai à 60 secondes
        });

        // Récupère l'URI pour se connecter à la base de données en mémoire
        const getUri = mongod.getUri();
        
        // Connexion à la base de données MongoDB
        const db = await mongoose.connect(getUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Database connected successfully");

        return db;
    } catch (error) {
        console.error("Failed to connect to the database", error);
        throw error;
    }
}

export default connect;
