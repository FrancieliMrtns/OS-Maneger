const ordemServicoService = require("../services/ordem-servico-service");
const userService = require("../services/user-service");
const imagemService = require("../services/imagem-service");

module.exports = {

  OSGetAllFilter: async (req, res) => {
    let json = {
      error: "",
      quantidade_OS: 0,
      result: [],
    };

    let filtros = {
      id: req.query.id,
      solicitante_id: req.query.solicitante_id,
      data_solicitacao: req.query.data_solicitacao,
      setor_principal_id: req.query.setor_principal_id
        ? [req.query.setor_principal_id]
        : null,
      setor_secundario_id: req.query.setor_secundario_id,
      status_os: req.query.status_os ? [req.query.status_os] : null,
      nivel_prioridade: req.query.nivel_prioridade
        ? [req.query.nivel_prioridade]
        : null,
      servico_terceirizado: req.query.servico_terceirizado,
      tipo_servico_id: req.query.tipo_servico_id,
      tecnico_id: req.query.tecnico_id,
      data_inicial: req.query.inicial,
      data_final: req.query.data_final,
      feedback: req.query.feedback,
    };

    try {
      let ordemServico = await ordemServicoService.OSGetAllFilter(filtros);
  
      if (ordemServico) {
        json.result = ordemServico;
        json.quantidade_OS = ordemServico.length;
        for (const os of ordemServico) {
          const images = await imagemService.findImageByOsId(os.id);
          os.images = images;
        }
      } else {
        console.log(filtros);
      }
    } catch (error) {
      console.log(error);
      json.error = "Ocorreu um erro ao buscar as ordens de serviço.";
    }
  
    res.json(json);
  },
    
    ordemServicoGetAll: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    const { ordenar } = req.body;

    let ordemServico = await ordemServicoService.ordemServicoGetAll(ordenar);

    if (ordemServico) {
      for (const os of ordemServico) {
        const images = await imagemService.findImageByOsId(os.id);
        os.images = images;
      }
      json.result = ordemServico;
    }
    res.json(json);
  },

  ordemServicoGetById: async (req, res) => {
    let json = {
      error: "",
      result: {},
    };

    let id = req.params.id;
    let ordemServico = await ordemServicoService.ordemServicoGetById(id);

    if (ordemServico) {
        const images = await imagemService.findImageByOsId(id);
      console.log(images);
      ordemServico.images = images;
      json.result = ordemServico;
    }
    res.json(json);
  },

  ordemServicoGetBySolicitanteId: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let solicitante_id = req.params.solicitante_id;
    let ordemServico = await ordemServicoService.ordemServicoGetBySolicitanteId(
      solicitante_id
    );

    if (ordemServico) {
      json.result = ordemServico;
    }
    res.json(json);
  },
  ordemServicoGetByTecnicoId: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let tecnico_id = req.params.tecnico_id;
    let ordemServico = await ordemServicoService.ordemServicoGetByTecnicoId(
      tecnico_id
    );

    if (ordemServico) {
      for (const os of ordemServico) {
        const images = await imagemService.findImageByOsId(os.id);
        os.images = images;
      }
      json.result = ordemServico;

    res.json(json);
    }
  },
  ordemServicoGetByPrioridade: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let prioridade = req.body.prioridade;
    let ordemServico = await ordemServicoService.ordemServicoGetByPrioridade(
      prioridade
    );

    if (ordemServico) {
      json.result = ordemServico;
    }
    res.json(json);
  },
  ordemServicoGetByStatus: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let status = req.body.status;
    let ordemServico = await ordemServicoService.ordemServicoGetByStatus(
      status
    );

    if (ordemServico) {
      for (const os of ordemServico) {
        const images = await imagemService.findImageByOsId(os.id);
        os.images = images;
      }
      json.result = ordemServico;

    res.json(json);
    }
  },
  ordemServicoGetByInstituicao: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let instituicao = req.body.instituicao;
    let ordemServico = await ordemServicoService.ordemServicoGetByInstituicao(
      instituicao
    );

    if (ordemServico) {
      for (const os of ordemServico) {
        const images = await imagemService.findImageByOsId(os.id);
        os.images = images;
      }
      json.result = ordemServico;

    res.json(json);
    }
  },
  solicitarOrdemServico: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };
  
    let solicitante_id = req.body.solicitante_id;
    let data_solicitacao = req.body.data_solicitacao;
    let tipo_servico_id = req.body.tipo_servico_id;
    let descricao = req.body.descricao;
    let setor_principal_id = req.body.setor_principal_id;
    let setor_secundario_id = req.body.setor_secundario_id;
    let status_os = "Solicitada";
  
    const files = req.files || [];
    const img_type = 1;
  
    try {
      const os = await ordemServicoService.solicitarOrdemServico(
        solicitante_id,
        data_solicitacao,
        tipo_servico_id,
        descricao,
        setor_principal_id,
        setor_secundario_id,
        status_os
      );
  
      const os_id = os.insertId;
  
      const response = await imagemService.uploadImagem(files, os_id, img_type);
  
      json.result = {
        message: "Ordem de Serviço solicitada com sucesso!",
        solicitante_id: solicitante_id,
        data_solicitacao: data_solicitacao,
        tipo_servico_id: tipo_servico_id,
        descricao: descricao,
        setor_principal_id: setor_principal_id,
        setor_secundario_id: setor_secundario_id,
        status: status_os,
        uploadResponse: response,
      };
    } catch (error) {
      console.log(error);
      json.error = error.toString();
    }
    res.json(json);
  },
  aprovarOrdemServico: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let ordem_servico_id = req.body.ordem_servico_id;
    let nivel_prioridade = req.body.nivel_prioridade;
    let servico_terceirizado = req.body.servico_terceirizado;
    let tipo_servico_id = req.body.tipo_servico_id;
    let tecnico_id = req.body.tecnico_id;
    let descricao = req.body.descricao;
    let setor_principal_id = req.body.setor_principal_id;
    let setor_secundario_id = req.body.setor_secundario_id;
    let status_os = "Aprovada";

    try {
      const tecnico = await userService.userGetById(tecnico_id);
      if (tecnico && tecnico.terceirizado) {
        servico_terceirizado = true;
      }

      await ordemServicoService.aprovarOrdemServico(
        ordem_servico_id,
        nivel_prioridade,
        servico_terceirizado,
        tipo_servico_id,
        tecnico_id,
        descricao,
        setor_principal_id,
        setor_secundario_id,
        status_os
      );

      json.result = {
        message: "Ordem de Serviço aprovada com sucesso!",
        ordem_servico_id: ordem_servico_id,
        nivel_prioridade: nivel_prioridade,
        servico_terceirizado: servico_terceirizado,
        tipo_servico_id: tipo_servico_id,
        tecnico_id: tecnico_id,
        descricao: descricao,
        setor_principal_id: setor_principal_id,
        setor_secundario_id: setor_secundario_id,
        status: status_os,
      };
    } catch (error) {
      console.log(error);
    }

    res.json(json);
  },

  rejeitarOrdemServico: async (req, res) => {
      let json = {
        error: "",
        result: [],
      };

      let {os_id} = req.params;
      let status_os = "Rejeitada";
      try {
        await ordemServicoService.rejeitarOrdemServico(status_os, os_id);
        json.result = {
          message: "Ordem de Serviço rejeitada com sucesso!",
          os_id: os_id,
        };
      } catch (error) {
        console.log(error);
        json.error = "Erro ao rejeitar a ordem de serviço";
      }
      res.json(json);
    },
  // concluirOrdemServico: async (req, res) => {
  //   let json = {
  //     error: "",
  //     result: [],
  //   };

  //   let ordem_servico_id = req.body.ordem_servico_id;
  //   let data_final = req.body.data_final;
  //   let material = req.body.material;
  //   let relatorio = req.body.relatorio;
  //   let status_os = "Concluída";

  //   const files = req.files || [];
  //   const img_type = 2;
  //   const os_id = ordem_servico_id;

  //   if (files.length === 0) {
  //     json.error = "No files uploaded";
  //     res.json(json);
  //     return;
  //   }

  //   try {
  //     ordemServicoService.concluirOrdemServico(
  //       ordem_servico_id,
  //       data_final,
  //       material,
  //       relatorio,
  //       status_os
  //     );
      
  //     const response = await imagemService.uploadImagem(files, os_id, img_type);

  //     json.result = {
  //       message: "Ordem de Serviço concluída com sucesso!",
  //       ordem_servico_id: ordem_servico_id,
  //       data_final: data_final,
  //       material: material,
  //       status: status_os,
  //       uploadResponse: response,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   res.json(json);
  // },
  concluirOrdemServico: async (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let ordem_servico_id = req.body.ordem_servico_id;
    let data_final = req.body.data_final;
    let material = req.body.material;
    let relatorio = req.body.relatorio;
    let status_os = "Concluída";

    const files = req.files || [];
    const img_type = 2;
    const os_id = ordem_servico_id;

    try {
      ordemServicoService.concluirOrdemServico(
        ordem_servico_id,
        data_final,
        material,
        relatorio,
        status_os
      );
      
      const response = await imagemService.uploadImagem(files, os_id, img_type);

      json.result = {
        message: "Ordem de Serviço concluída com sucesso!",
        ordem_servico_id: ordem_servico_id,
        data_final: data_final,
        material: material,
        status: status_os,
        uploadResponse: response,
      };
    } catch (error) {
      console.log(error);
    }
    res.json(json);
  },

  finalizarOrdemServico: (req, res) => {
    let json = {
      error: "",
      result: [],
    };

    let ordem_servico_id = req.body.ordem_servico_id;
    let feedback = req.body.feedback;
    let status_os = "Finalizada";

    try {
      ordemServicoService.finalizarOrdemServico(
        ordem_servico_id,
        feedback,
        status_os
      );
      json.result = {
        message: "Ordem de Serviço finalizada com sucesso!",
        ordem_servico_id: ordem_servico_id,
        feedback: feedback,
        status: status_os,
      };
    } catch (error) {
      console.log(error);
    }
    res.json(json);
  },
  quantidadeByStatus : async (req, res) => {
    let json = {
    };

    try {
      const quantidade = await ordemServicoService.quantidadeByStatus();
      json.result = quantidade;
    } catch (error) {
      console.log(error);
    }
    res.json(json);
  }

};
