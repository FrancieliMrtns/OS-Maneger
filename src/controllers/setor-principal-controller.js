const setorPrincipalService = require('../services/setor-principal-service');
module.exports = {
    setorPrincipalGetAll: async (req, res) => {
        let json = {
            error: '', 
            result: []
        }

        let setorPrincipal = await setorPrincipalService.setorPrincipalGetAll();

        if (setorPrincipal) {
            json.result = setorPrincipal;
        }
        res.json(json);
    }, 
    setorPrincipalGetById: async (req, res) => {
        let json = {
            error: '', 
            result: []
        }

        let id = req.params.id;
        let setorPrincipal = await setorPrincipalService.setorPrincipalGetById(id);

        if (setorPrincipal) {
            json.result = setorPrincipal;
        }
        res.json(json);
    }
    // instituicaoCreate: async (req, res) => {
    //     let json = {
    //         error: '', 
    //         result: []
    //     };

    //     let nome = req.body.nome;

    //     try {
    //         await instituicaoService.instituicaoCreate(nome);
    //         json.result = {
    //             message: 'Instituição cadastrada com sucesso!',
    //             instituição: nome
    //         };
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     res.json(json);
    // }, 
    // instituicaoUpdate: async (req, res) => {
    //     let json = {
    //         error: '', 
    //         result: []
    //     };
        
    //     let id = req.params.id;
    //     let nome = req.body.nome;

    //     try {
    //         await instituicaoService.instituicaoUpdate(id, nome);
    //         json.result = {
    //             message:  'Instituição atualizada com sucesso!',
    //             instituição: nome,
    //             instituição_id: id
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // }, 
    // instituicaoDelete: async (req, res) => {
    //     let json = {
    //         error: '', 
    //         result: []
    //     };
        
    //     let id = req.params.id;

    //     try {
    //         await instituicaoService.instituicaoDelete(id);
    //         json.result = {
    //             message: 'Instituição deletada com sucesso!',
    //             instituição_id: id
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // }
}