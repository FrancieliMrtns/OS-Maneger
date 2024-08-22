const mysql = require("../database/mysql");

module.exports = {
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      mysql.query(
        "SELECT * FROM usuario WHERE email = ? ORDER BY id DESC",
        [email],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results[0]);
        }
      );
    });
  },
  userGetAll: () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        "SELECT usuario.*, tipo_servico.nome AS tipo_servico_nome FROM usuario LEFT JOIN tipo_servico ON usuario.tipo_servico_id = tipo_servico.id WHERE cargo != 'Bloqueado' ORDER BY id DESC",
        (err, result) => {
          if (err) return reject(err);

          const mappedResult = result.map((user) => {
            delete user.senha;

            if (user.cargo === "Admin") {
              user.cargo = "Administrador";
            } else if (user.cargo === "Tecnico") {
              user.cargo = "Técnico";
            } else if (user.cargo === "Solicitante") {
              user.cargo = "Solicitante";
            }

            user.terceirizado = user.terceirizado ? "Sim" : "Não";

            return user;
          });

          resolve(mappedResult);
        }
      );
    });
  },
  userGetAllTec: () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        'SELECT * FROM usuario WHERE cargo = "Tecnico" ORDER BY id DESC',
        (err, result) => {
          if (err) return reject(err);

          const mappedResult = result.map((user) => {
            if (user.cargo === "Tecnico") {
              user.cargo = "Técnico";
            }

            user.terceirizado = user.terceirizado ? "Sim" : "Não";

            return user;
          });
          resolve(mappedResult);
        }
      );
    });
  },
  userGetById: (id) => {
    return new Promise((resolve, reject) => {
      mysql.query(
        "SELECT usuario.*, tipo_servico.nome AS tipo_servico_nome FROM usuario LEFT JOIN tipo_servico ON usuario.tipo_servico_id = tipo_servico.id WHERE usuario.id = ? ORDER BY usuario.id DESC",
        [id],
        (err, result) => {
          if (err) return reject(err);

          if (result.length > 0) {
            delete result[0].senha;

            result[0].terceirizado = result[0].terceirizado ? "Sim" : "Não";
          }

          resolve(result[0]);
        }
      );
    });
  },
  userCreate: (
    nome,
    email,
    senha,
    terceirizado,
    empresa,
    cargo,
    tipo_servico_id,
    data_insercao
  ) => {
    return new Promise((resolve, reject) => {
      mysql.query(
        "SELECT * FROM usuario WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            return res.status(500).send({ error: error });
          }
          if (results.length > 0) {
            return reject("E-mail já cadastrado!");
          } else {
            mysql.query(
              "INSERT INTO usuario (nome, email, senha, terceirizado, empresa, cargo, tipo_servico_id, data_insercao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                nome,
                email,
                senha,
                terceirizado,
                empresa,
                cargo,
                tipo_servico_id,
                data_insercao,
              ],
              (err, result) => {
                if (err) return reject(err);
                resolve(result);
              }
            );
          }
        }
      );
    });
  },
  userLogin: (email) => {
    return new Promise((resolve, reject) => {
      mysql.query(
        "SELECT * FROM usuario WHERE email = ?",
        [email],
        (err, results) => {
          if (err) {
            reject(err);
          }
          return resolve(results);
        }
      );
    });
  },
  getUserPassword: (id) => {
    return new Promise((resolve, reject) => {
      mysql.query(
        "SELECT senha FROM usuario WHERE id = ?",
        [id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
  updateUserPassword: (id, novaSenha) => {
    return new Promise((resolve, reject) => {
      mysql.query(
        "UPDATE usuario SET senha = ? WHERE id = ?",
        [novaSenha, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  userUpdate: (
    id,
    nome,
    email,
    senha,
    terceirizado,
    empresa,
    cargo,
    tipo_servico_id
  ) => {
    const terceirizadoBool = terceirizado === "Sim";
    return new Promise((resolve, reject) => {
      mysql.query(
        "SELECT senha FROM usuario WHERE id = ?",
        [id],
        (err, result) => {
          if (err) return reject(err);

          const { senha: senhaAtual } = result[0];

          const novaSenha = senha || senhaAtual;

          mysql.query(
            "UPDATE usuario SET nome = ?, email = ?, senha = ?, terceirizado = ?, empresa = ?, cargo = ?, tipo_servico_id = ? WHERE id = ?",
            [
              nome,
              email,
              novaSenha,
              terceirizadoBool,
              empresa,
              cargo,
              tipo_servico_id,
              id,
            ],
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
        }
      );
    });
  },
  userDelete: (id) => {
    return new Promise((resolve, reject) => {
      mysql.query(
        'UPDATE usuario SET cargo = "Bloqueado" WHERE id = ?',
        [id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
};
