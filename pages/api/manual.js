import moment from "moment";
import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default function handlerManual(req,res) {
    const { method } = req;
   
    if(method === 'GET') {
        getStepsManual(req,res);
    }
    if(method === 'POST') {
        createStepManualStep(req,res);  
    }
    if(method === 'PUT') {
        editStepManual(req,res);  
    }
}

const editStepManual = ({ body },res) => {
    const editStepManual = async () => {
        try {
            const {
                title,
                image,
                video,
                order,
                description, 
                buttons, 
                language,
                step
            } = body;
            const objectModified = {
                $set: {
                    title: title,
                    image: image,
                    video: video,
                    order: order,
                    description: description,
                    buttons: buttons,
                    language: language
                }
            };
            const filter = { id : step};
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ManualSteps");
            const update = await collection.updateOne(filter,objectModified);
            console.log(update)
            res.status(200).json({
                message: 'Se a actualizado correctamente.'
            })
        } catch (err) {
            console.error(`Error al actualizar paso del manual: ${err}`)
            res.status(500).json({
                message: `Error al actualizar el manual.`
            })
        } 
    };
    editStepManual();
};

const getStepsManual = ({body},res) => {
    const fetchManualSteps = async () => {
        try {
            const { language } = body;
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ManualSteps");
            const fetchManul = await collection.find().toArray();
            session.close();
            res.status(200).json({
                steps: fetchManul
            });
        } catch(err) {
            console.error(`Error al obtener pasos del manual ${err}`);
            res.status(500).json({
                message: 'No se puede obtener el manual de la base de datos.'
            });
        }
    }
    fetchManualSteps();
};

const createStepManualStep = ({ body },res) => {
    const fetchInfoConfig = async () => {
        try {
            const { title = '',image = '', video = '', order = '', description = '', buttons = {}, language = 'es' } = body;
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ManualSteps");
            const createManualStep = await collection.insertOne({
                id: uuidv4(),
                title,
                image,
                video,
                order,
                description, 
                buttons, 
                language
            });
            res.status(200).json({
                configurationSite: createManualStep
            });
        } catch (err) {
            console.error(`Error al crear un paso del manual ${err}`);
            res.status(500).json({
                error: `No se pudo obtener la configuración del sitio.`
            });
        }
    };
    fetchInfoConfig();
};





