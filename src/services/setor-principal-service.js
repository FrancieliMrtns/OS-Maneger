const mysql = require('../database/mysql');

module.exports = {
    setorPrincipalGetAll: () =>  {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM setor_principal', 
            (err, result) => {
                if(err) return reject(err);
                resolve(result);
            });
        });
    }, 
    setorPrincipalGetById: (id) =>  {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM setor_principal WHERE id =?', 
            [id], 
            (err, result) => {
                if(err) return reject(err);
                resolve(result);
            });
        });
    }
    // instituicaoCreate: (nome) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('INSERT INTO instituicao (nome) VALUES (?)', 
    //         [nome], 
    //         (err, result) => {
    //             if(err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }, 
    // instituicaoUpdate: (id, nome) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('UPDATE instituicao SET nome = ? WHERE id = ?', 
    //         [nome, id], 
    //         (err, result) => {
    //             if(err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }, 
    // instituicaoDelete: (id) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('DELETE FROM instituicao WHERE id = ?', 
    //         [id], 
    //         (err, result) => {
    //             if(err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }
}