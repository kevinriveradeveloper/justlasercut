import moment from "moment";
import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default function handler(req,res) {
    const { method } = req;
   
    if(method === 'GET') {
        getSiteProps(req,res); 
    }
    if(method === 'POST') {
        ConfigSiteProps(req,res);  
    }
}

const getSiteProps = ({ body },res) => {
    const fetchInfoConfig = async () => {
        try {
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ConfigurationSite");
            const createConfig = await collection.find().toArray();
            res.status(200).json({
                configurationSite: createConfig
            });
        } catch (err) {
            console.error(`Error al intentar obtener las propiedades del sitio`);
            res.status(500).json({
                error: `No se pudo obtener la configuración del sitio.`
            });
        }
    };
    fetchInfoConfig();
};

const ConfigSiteProps = ({ body }, res) => {
    const fetchConfiguration = async () => {
        try { 
            const { 
                id = '0001',
                sitename = '', 
                email = '',  
                maintance = '', 
                phone = '', 
                GoogleApiDeveloper = '', 
                FacebookApiDeveloper = ''
            } = body;
            const client = await MongoClient.connect(url);
            const db = client.db();
            const collection = db.collection("ConfigurationSite");
            const createConfiguration = await collection.insertOne({
                sitename, email, maintance, phone
            });
            res.status(200).json({
                message:'Configuracion iniciada'
            })
        } catch (err) {
            console.error(`Error al configurar variables del sitio: ${err}`)
            res.status(500).json({
                message:'No se puede guardar la configuracion.'
            })
        }
    }
    fetchConfiguration();
}



