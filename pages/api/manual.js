import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default (req,res) => {
    if(req.method === 'POST') {
        createStepManualStep(req,res)
    };
    if(req.method === 'GET') {
        getStepsManual(req,res)
    };
    if(req.method === 'PUT') {
        editStepManual(req,res)
    };
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
            await collection.updateOne(filter,objectModified);
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
            const { title = '',image = '', video = '', order = '', description = '', buttons = {} } = body;
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ManualSteps");
            const idManualStep = uuidv4();
            const createManualStep = await collection.insertOne({
                id: idManualStep,
                title,
                image: `${idManualStep}.png`,
                video: `${idManualStep}.png`,
                order,
                description, 
                buttons, 
                language : 'ES'
            });
            
            res.status(200).json({
                id: idManualStep,
                configurationSite: createManualStep
            });
        } catch (err) {
            console.error(`Error al crear un paso del manual ${err}`);
            res.status(500).json({
                error: `No se pudo obtener la configuraci??n del sitio.`
            });
        }
    };
    fetchInfoConfig();
};




