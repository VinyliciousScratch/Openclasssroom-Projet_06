const sharp = require('sharp');
const path = require('path');

exports.uploadImage = async (req, res, next) => {
    try {
        if (req.method === "POST" && !req.file) {
            return res.status(400).json({ message: "Image required" });
        }

        if (!req.file) {
            return next(); 
        }
        const name = req.file.originalname.replace(/[\\/:*?"<>|\s]/g, '_');
            
        const fileName = name + Date.now() + '.jpg';

        await sharp(req.file.buffer)
            .resize(800)
            .jpeg({ quality: 80 })
            .toFile(path.join('images', fileName));

        req.file.filename = fileName;

        next();

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};