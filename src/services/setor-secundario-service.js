const mysql = require('../database/mysql');

module.exports = {
    setorSecundarioGetAll: () => {
        return new Promise((resolve, reject) => {
            mysql.query(
                `SELECT ss.id, ss.nome,
          CONCAT(
            CASE ss.bloco
              WHEN 1 THEN 'A'
              WHEN 2 THEN 'B'
              WHEN 3 THEN 'C'
              WHEN 4 THEN 'D'
              WHEN 5 THEN 'E'
              ELSE ''
            END,
            CASE
              WHEN ss.bloco IS NOT NULL THEN ' - '
              ELSE ''
            END,
            ss.nome
          ) AS setor_secundario_com_bloco,
          i.nome AS instituicao
        FROM setor_secundario ss
        LEFT JOIN setor_principal i ON ss.setor_principal_id = i.id`,
            (err, result) => {
                if(err) return reject(err);
                resolve(result);
            });
        });
    
    }, 
    setorSecundarioGetBySetorPrincipal: (nomeSetorPrincipal, idSetorPrincipal) => {
        return new Promise((resolve, reject) => {
            mysql.query(
                `SELECT ss.id, ss.nome,
          CONCAT(
            CASE ss.bloco
              WHEN 1 THEN 'A'
              WHEN 2 THEN 'B'
              WHEN 3 THEN 'C'
              WHEN 4 THEN 'D'
              WHEN 5 THEN 'E'
              ELSE ''
            END,
            CASE
              WHEN ss.bloco IS NOT NULL THEN ' - '
              ELSE ''
            END,
            ss.nome
          ) AS setor_secundario_com_bloco,
          i.nome AS instituicao
        FROM setor_secundario ss
        LEFT JOIN setor_principal i ON ss.setor_principal_id = i.id
        WHERE i.nome = ? or i.id = ?`, 
            [nomeSetorPrincipal, idSetorPrincipal], 
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
    // setorCreate: (nome, instituicao_id) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('INSERT INTO setor (nome, instituicao_id) VALUES (?, ?)', 
    //         [nome, instituicao_id], 
    //         (err, result) => {
    //             if (err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }, 
    // setorUpdate: (id, nome, instituicao_id) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('UPDATE setor SET nome =?, instituicao_id =? WHERE id =?', 
    //         [nome, instituicao_id, id], 
    //         (err, result) => {
    //             if (err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }, 
    // setorDelete: (id) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('DELETE FROM setor WHERE id =?', 
    //         [id], 
    //         (err, result) => {
    //             if (err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }
}