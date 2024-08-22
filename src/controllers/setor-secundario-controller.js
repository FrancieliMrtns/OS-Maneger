const setorSecundarioService = require('../services/setor-secundario-service');

module.exports = {
    setorSecundarioGetAll: async (req, res) => {
        let json = {
            erro: '', 
            result: []
        };

        let setorSecundario = await setorSecundarioService.setorSecundarioGetAll();

        if (setorSecundario) {
            json.result = setorSecundario;
        }
        res.json(json);
    }, 
    setorSecundarioGetBySetorPrincipal: async (req, res) => {
        let json = {
            erro: '', 
            result: []
        };


        let idSetorPrincipal = req.query.idSetorPrincipal;
        let nomeSetorPrincipal = req.query.nomeSetorPrincipal;
        let setorSecundario = await setorSecundarioService.setorSecundarioGetBySetorPrincipal(nomeSetorPrincipal, idSetorPrincipal);


        if (setorSecundario) {
            json.result = setorSecundario;
        }
        res.json(json);
        
    }, 
    // setorCreate: async (req, res) => {
    //     let json = {
    //         erro: '', 
    //         result: []
    //     }

    //     let nome = req.body.nome;
    //     let instituicao_id = req.body.instituicao_id;

    //     try {
    //         await setorService.setorCreate(nome, instituicao_id);
    //         json.result = {
    //             message:  'Setor criado com sucesso!',
    //             nome_setor: nome, 
    //             instituição_id: instituicao_id
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // }, 
    // setorUpdate: async (req, res) => {
    //     let json = {
    //         erro: '', 
    //         result: []
    //     }

    //     let id = req.params.id;
    //     let nome = req.body.nome;
    //     let instituicao_id = req.body.instituicao_id;

    //     try {
    //         await setorService.setorUpdate(id, nome, instituicao_id);
    //         json.result = {
    //             message: 'Setor atualizado com sucesso!',
    //             nome_setor: nome, 
    //             instituição_id: instituicao_id
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // }, 
    // setorDelete: async (req, res) => {
    //     let json = {
    //         erro: '', 
    //         result: []
    //     }

    //     let id = req.params.id;

    //     try {
    //         await setorService.setorDelete(id);
    //         json.result = {
    //             message: 'Setor deletado com sucesso!',
    //             setor_id: id
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // } 
}