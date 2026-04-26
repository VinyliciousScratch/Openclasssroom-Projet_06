const sharp = require('sharp');
const path = require('path');

exports.uploadImage = async (req, res, next) => {
    try {
       //vérifie si fichier envoyé par multer
        if (!req.file) {
            return res.status(400).json({ message: "No file" });
        }
        //nettoie le nom du fichier et remplace les espaces et autres caractères spéciaux par des "_"
        const name = req.file.originalname.replace(/[\\/:*?"<>|\s]/g, '_');
            
        //génère nom unique pour éviter les conflits
        const fileName = name + Date.now() + '.jpg';

        //modification de l'image
        await sharp(req.file.buffer)
            .resize(800)
            .jpeg({ quality: 80 })
            .toFile(path.join('images', fileName));

        //transmet au controller
        req.file.filename = fileName;

        next();

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};