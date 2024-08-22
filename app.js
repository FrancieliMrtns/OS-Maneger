const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

const tipo_do_servico = require('./src/routes/tipo-servico-routes');
const setorPrincipal = require('./src/routes/setor-principal-routes'); 
const setorSecundario = require('./src/routes/setor-secundario-routes');
const usuario = require('./src/routes/user-routes');
const ordemServico = require('./src/routes/ordem-servico-routes');
const imagem = require('./src/routes/imagem-routes');

app.use(bodyParser.json({
    limit: '5mb'
    }
));
app.use(bodyParser.urlencoded({
    extended: false 
    }
));

app.use(cors());

app.use('/tipo-servico', tipo_do_servico);
app.use('/setor-principal', setorPrincipal);
app.use('/setor-secundario', setorSecundario)
app.use('/user', usuario);
app.use('/ordem-servico', ordemServico);
app.use('/imagem', imagem);

module.exports = app;