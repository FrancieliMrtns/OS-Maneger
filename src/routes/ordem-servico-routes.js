const express = require('express');
const router = express.Router();
const ordemServicoController = require('../controllers/ordem-servico-controller');
const login = require('../middleware/login');
const roles = require('../middleware/roles');
const multer = require('multer');
const upload = multer();

router.get('/', login.verifyToken, roles.adminRole, ordemServicoController.ordemServicoGetAll);

router.get('/:id', login.verifyToken, roles.adminRole, ordemServicoController.ordemServicoGetById);

router.get('/solicitante/:solicitante_id', login.verifyToken, roles.solicitanteRole, ordemServicoController.ordemServicoGetBySolicitanteId);

router.get('/tecnico/:tecnico_id', login.verifyToken, roles.tecnicoRole, ordemServicoController.ordemServicoGetByTecnicoId);

router.get('/admin/filtros', login.verifyToken, roles.adminRole, ordemServicoController.OSGetAllFilter);

router.get('/filtro/prioridade', login.verifyToken, roles.adminRole, ordemServicoController.ordemServicoGetByPrioridade);

router.get('/filtro/status', login.verifyToken, roles.adminRole, ordemServicoController.ordemServicoGetByStatus)

router.get('/filtro/instituicao', login.verifyToken, roles.adminRole, ordemServicoController.ordemServicoGetByInstituicao);

router.get('/quantidade/os', login.verifyToken, roles.adminRole, ordemServicoController.quantidadeByStatus);

router.post('/solicitar', login.verifyToken, roles.solicitanteRole, upload.array('file', 5), ordemServicoController.solicitarOrdemServico);

router.patch('/aprovar', login.verifyToken, roles.adminRole, ordemServicoController.aprovarOrdemServico);

router.patch('/rejeitar/:os_id', login.verifyToken, roles.adminRole, ordemServicoController.rejeitarOrdemServico);

router.patch('/concluir', login.verifyToken, roles.tecnicoRole, upload.array('file', 5), ordemServicoController.concluirOrdemServico);

router.patch('/finalizar', login.verifyToken, roles.adminRole, ordemServicoController.finalizarOrdemServico);

module.exports = router;
