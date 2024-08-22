const tipoServicoService  = require('../services/tipo-servico-service');

module.exports = {
    tipoServicoGetAll:  async (req, res) => {
        let json = {
            error: '',
            result: {}
        };

        let tipoServico  = await tipoServicoService.tipoServicoGetAll();

        if (tipoServico) {
            json.result = tipoServico;
        }
        res.json(json);
    }, 
    tipoServicoGetById: async (req, res) => {
        let json = {
            error: '',
            result: {}
        };

        let id = req.params.id;
        let tipoServico = await tipoServicoService.tipoServicoGetById(id);

        if (tipoServico) {
            json.result = tipoServico;
        }
        res.json(json);
    }
    // categoriaCreate: async (req, res) => {
    //     let json = {
    //         error: '',
    //         result: {}
    //     };
    //     let nome = req.body.nome;

    //     try {
    //         await categoriaService.categoriaCreate(nome);
    //         json.result = {
    //             message: 'Categoria cadastrada com sucesso!',
    //             nome_categoria: nome
    //         };
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // }, 
    // categoriaUpdate: async (req, res) => {
    //     let json = {
    //         error: '',
    //         result: {}
    //     };
    //     let id = req.params.id;
    //     let nome = req.body.nome;
        
    //     try {
    //         await categoriaService.categoriaUpdate(id, nome);
    //         json.result = {
    //             message: 'Categoria atualizada com sucesso!',
    //             categoria_id: id,
    //             nome_categoria: nome
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // }, 
    // categoriaDelete: async (req, res) => {
    //     let json = {
    //         error: '',
    //         result: {}
    //     };
    //     let id = req.params.id;
        
    //     try {
    //         await categoriaService.categoriaDelete(id);
    //         json.result = {
    //             message: 'Categoria atualizada com sucesso!',
    //             categoria_id: id
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.json(json);
    // }
};