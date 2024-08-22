require('dotenv').config();
const userService = require('../services/user-service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports =  {
    userGetAll: async (req, res) => {
        let json = {
            erro: '', 
            quantidade_User: 0,
            result: []
        };

        let users = await userService.userGetAll();

        if (users) {
            json.result = users;
            json.quantidade_User = users.length;
        }
        res.json(json);
    },
    userGetAllTec: async (req, res) => {
        let json = {
            erro: '', 
            quantidade_Tec: 0,
            result: []
        };

        let tecnico = await userService.userGetAllTec();

        if (tecnico) {
            json.result = tecnico
            json.quantidade_Tec = tecnico.length;
        }
        res.json(json);
    },
    userIdentify: async (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            console.log(err);
            if (err) return res.sendStatus(403);
            req.user = user;
            res.json(user);
        }) 
    },
    userGetById: async (req, res) => {
        let json = {
            erro: '', 
            result: []
        };

        let user = await userService.userGetById(req.params.id);

        if (user) {
            json.result = user;
        }
        res.json(json);
    }, 
    userCreate: async (req, res) => {
        let json = {
            erro: '', 
            result: []
        };

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;
        let terceirizado = req.body.terceirizado;
        let empresa = '';
        let cargo = req.body.cargo;
        let tipo_servico_id = req.body.tipo_servico_id;
        let data_insercao = req.body.data_insercao;
        
        try {
            const existingUser = await userService.getUserByEmail(email);
            if (existingUser) {
                json.erro = 'O email já está cadastrado.';
                return res.json(json);
            }
            
            await bcrypt.hash(senha, 10, async (errBycrypt, hash) => {
                if (errBycrypt) { 
                    throw errBycrypt;
            }
            
            senha = hash;

            if (terceirizado == 1) {
                empresa = req.body.empresa;
            } 

            if (tipo_servico_id != null && cargo == "Tecnico") {
                tipo_servico_id = req.body.tipo_servico_id;
            }

            else if(tipo_servico_id != null && cargo == "Solicitante") {
                tipo_servico_id = 9;
            }

            await userService.userCreate(nome, email, senha, terceirizado, empresa, cargo, tipo_servico_id, data_insercao);
            
            let tipo_servico = '';
            switch (tipo_servico_id) {
            case 1:
                tipo_servico = 'Civil';
                break;
            case 2:
                tipo_servico = 'Hidráulica';
                break;
            case 3:
                tipo_servico = 'Elétrica';
                break;
            case 4:
                tipo_servico = 'Pintura';
                break;
            case 5:
                tipo_servico = 'Mecânica';
                break;
            case 6:
                tipo_servico = 'Mobiliário';
                break;
            case 7:
                tipo_servico = 'Ar-Condicionado';
                break;
            case 8:
                tipo_servico = 'Eletrônicos';
                break;
            default:
                tipo_servico = 'Outros';
                break;
            }
            
            json.result = {
                message: 'Usuário cadastrado com sucesso!',
                nome: nome,
                email: email,
                senha: senha,
                terceirizado: terceirizado,
                empresa: empresa,
                cargo: cargo,
                tipo_servico: tipo_servico
            };
            res.json(json);
        });
        } catch (error) {
                console.error(error);
                json.erro = 'E-mail já cadastrado!'
        }
    },
    userLogin: async (req, res) => {
        let json = {
            erro: '',
            result: {}
        };
    
        let email = req.body.email;
        let senha = req.body.senha;
    
        try {
            let result = await userService.userLogin(email);
            json.result = result;
    
            if (result.length > 0) {
                if (result[0].cargo === 'Bloqueado') {
                    return res.status(401).send({
                        message: "Usuário bloqueado! Entre em contato com o administrador."
                    });
                }
    
                if (await bcrypt.compare(senha, result[0].senha)) {
                    const tokenBody = {
                        id_usuario: result[0].id,
                        nome: result[0].nome,
                        email: result[0].email,
                        cargo: result[0].cargo,
                    }
                    const token = jwt.sign(tokenBody, process.env.JWT_KEY, { expiresIn: "7 days" });
    
                    return res.status(200).send({
                        ...tokenBody,
                        message: 'Autenticação concluída!',
                        token: token
                    });
                } else {
                    return res.status(401).send({
                        message: "Senha incorreta!"
                    });
                }
            } else {
                return res.status(401).send({
                    message: "E-mail inválido!"
                });
            }
        } catch (error) {
            console.error(error);
            json.erro = 'Falha na autenticação!';
        }
        res.json(json);
    },
    userUpdatePassword: async (req, res) => {
        let json = {
          erro: '',
          result: []
        };
      
        let id = req.params.id;
        let senhaVelha = req.body.senhaVelha;
        let senhaNova = req.body.senhaNova;
      
        try {
            let result = await userService.getUserPassword(id);
            if (senhaVelha && result.length > 0 && result[0].senha) {
            let senhaCorreta = await bcrypt.compare(senhaVelha, result[0].senha);
            if (senhaCorreta) {
              let senhaHash = await bcrypt.hash(senhaNova, 10);
              await userService.updateUserPassword(id, senhaHash);
              json.result = {
                message: 'Senha atualizada com sucesso!'
              };
            } else {
              json.erro = 'Senha antiga incorreta!';
            }
          } else {
            json.erro = 'Usuário não encontrado!';
          }
        } catch (error) {
          console.error(error);
          json.erro = 'Falha ao atualizar senha!';
        }
        res.json(json);
      },      
      
    userUpdate: async (req, res) => {
        let json = {
        erro: '',
        result: []
        };
    
        let id = req.params.id;
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;
        let terceirizado = req.body.terceirizado;
        let empresa = '';
        let cargo = req.body.cargo;
        let tipo_servico_id = req.body.tipo_servico_id;
    
        if (terceirizado == 1) {
        empresa = req.body.empresa;
        }
    
        if (tipo_servico_id != null && cargo == "Tecnico") {
            tipo_servico_id = req.body.tipo_servico_id;
        } else if (cargo == "Admin" || cargo == "Solicitante" || cargo == "Bloqueados") {
            tipo_servico_id = null;
        }
    
        try {
        const existingUser = await userService.userGetById(id);
    
        if (!existingUser) {
            json.erro = 'Usuário não encontrado.';
            return res.json(json);
        }
    
        if (senha) {
            senha = await bcrypt.hash(senha, 10);
        } else {
            senha = existingUser.senha; 
        }
    
        await userService.userUpdate(id, nome, email, senha, terceirizado, empresa, cargo, tipo_servico_id);
    
        json.result = {
            message: 'Usuário atualizado com sucesso!',
            user: id,
            nome: nome,
            email: email,
            terceirizado: terceirizado,
            empresa: empresa,
            cargo: cargo,
            tipo_servico_id: tipo_servico_id
        };
        } catch (error) {
        console.error(error);
        json.erro = 'Falha ao atualizar usuário.';
        }
    
        res.json(json);
    },
  
    userDelete: async (req, res) => {
        let json = {
            erro: '', 
            result: []
        };

        let id = req.params.id;

        try {
            await userService.userDelete(id);
            json.result = {
                message: 'Usuário removido com sucesso!',
            }
        } catch (error) {
            console.error(error);
            return res.status(401).send({
                message: `Não foi possível deletar o usuario!`
            });
        }
        res.json(json);
    }
}