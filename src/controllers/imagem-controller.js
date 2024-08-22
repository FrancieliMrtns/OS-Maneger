const imagemService = require('../services/imagem-service');


exports.getImagem = async (req, res) => {
    const img_key = req.params.img_key;

    try {
        const url = await imagemService.getImagem(img_key);
        res.json(url);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

exports.uploadImagem = async (req, res) => {
    const files = req.files || [];

    const { os_id, img_type } = req.body;

    try {
        const response = await imagemService.uploadImagem(files, os_id, img_type);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

exports.findAll = async (req, res) => {
    try {
        const images = await imagemService.findAllImages();
        return res.status(200).send(images);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao buscar as imagens no banco de dados', message: error.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const image = await imagemService.findImageById(req.params.id);
        return res.status(200).send(image);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao buscar a imagem no banco de dados', message: error.message });
    }
};

exports.findByOsId = async (req, res) => {
    try {
        const images = await imagemService.findImageByOsId(req.params.os_id);
        return res.status(200).send(images);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao buscar as imagens no banco de dados', message: error.message });
    }
};

