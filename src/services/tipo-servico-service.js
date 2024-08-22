const mysql = require('../database/mysql');

module.exports = {
    tipoServicoGetAll: () => {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM tipo_servico', 
            (err, result) => {
                if(err) return reject(err);
                resolve(result);
            });
        })
    },
    tipoServicoGetById: (id) => {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM tipo_servico WHERE id = ?', 
            [id], 
            (err, result) => {
                if(err) return reject(err);
                resolve(result);
            });
        });
    }
    // categoriaCreate: (nome) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('INSERT INTO categoria (nome) VALUES (?)', 
    //         [nome], 
    //         (err, result) => {
    //             if(err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }, 
    // categoriaUpdate: (id, nome) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('UPDATE categoria SET nome = ? WHERE id = ?', 
    //         [nome, id], 
    //         (err, result) => {
    //             if(err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }, 
    // categoriaDelete: (id) => {
    //     return new Promise((resolve, reject) => {
    //         mysql.query('DELETE FROM categoria WHERE id = ?', 
    //         [id], 
    //         (err, result) => {
    //             if(err) return reject(err);
    //             resolve(result);
    //         });
    //     });
    // }
}