const mysql = require('../database/mysql');

module.exports = {
    OSGetAllFilter: (filtros) => {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT
                    ordem_servico.*,
                    solicitante.nome AS solicitante_nome,
                    solicitante.email AS solicitante_email,
                    tecnico.nome AS tecnico_nome,
                    setor_principal.nome AS setor_principal_nome,
                    CONCAT(
                        CASE setor_secundario.bloco
                            WHEN 1 THEN 'A'
                            WHEN 2 THEN 'B'
                            WHEN 3 THEN 'C'
                            WHEN 4 THEN 'D'
                            WHEN 5 THEN 'E'
                            ELSE ''
                        END,
                        CASE
                            WHEN setor_secundario.bloco IS NOT NULL THEN ' - '
                            ELSE ''
                        END,
                        setor_secundario.nome
                    ) AS setor_secundario_com_bloco,
                    tipo_servico.nome AS tipo_servico_nome,
                    Prioridade.nivel_prioridade, 

                FROM ordem_servico
                LEFT JOIN usuario AS solicitante ON ordem_servico.solicitante_id = solicitante.id
                LEFT JOIN usuario AS tecnico ON ordem_servico.tecnico_id = tecnico.id
                LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id
                LEFT JOIN setor_secundario ON ordem_servico.setor_secundario_id = setor_secundario.id
                LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id
                LEFT JOIN Prioridade ON ordem_servico.id = Prioridade.ordem_servico_id
                WHERE 1=1`;

            const filterValues = [];
    
            if (filtros.id && filtros.id.length > 0) {
                query += ' AND ordem_servico.id IN (?)';
                filterValues.push(filtros.id);
            }
            if (filtros.solicitante_id && filtros.solicitante_id.length > 0) {
                query += ' AND ordem_servico.solicitante_id IN (?)';
                filterValues.push(filtros.solicitante_id);
            }
            if (filtros.data_solicitacao && filtros.data_solicitacao.length > 0) {
                query += ' AND ordem_servico.data_solicitacao IN (?)';
                filterValues.push(filtros.data_solicitacao);
            }
            if (filtros.setor_principal_id && filtros.setor_principal_id.length > 0) {
                const setorPrincipalValues = filtros.setor_principal_id.map(setor => {
                  if (setor === 'FSNT') return 1;
                  if (setor === 'FATEC') return 2;
                  if (setor === 'SENAI') return 3;
                  if (setor === 'CSN') return 4;
                });
                query += ' AND ordem_servico.setor_principal_id IN (?)';
                filterValues.push(setorPrincipalValues);
            }
            if (filtros.setor_secundario_id && filtros.setor_secundario_id.length > 0) {
                query += ' AND ordem_servico.setor_secundario_id IN (?)';
                filterValues.push(filtros.setor_secundario_id);
            }
            if (filtros.status_os && filtros.status_os.length > 0) {
                query += ' AND ordem_servico.status_os IN (?)';
                filterValues.push(filtros.status_os);
            } else {
                query += " AND ordem_servico.status_os IN ('Solicitada', 'Aprovada', 'Concluída')";
            }
            if (filtros.nivel_prioridade && filtros.nivel_prioridade.length > 0) {
                query += ' AND Prioridade.nivel_prioridade IN (?)';
                filterValues.push(filtros.nivel_prioridade);
            }
            if (filtros.servico_terceirizado && filtros.servico_terceirizado.length > 0) {
                query += ' AND ordem_servico.servico_terceirizado IN (?)';
                filterValues.push(filtros.servico_terceirizado);
            }
            if (filtros.tipo_servico_id && filtros.tipo_servico_id.length > 0) {
                query += ' AND ordem_servico.tipo_servico_id IN (?)';
                filterValues.push(filtros.tipo_servico_id);
            }
            if (filtros.tecnico_id && filtros.tecnico_id.length > 0) {
                query += ' AND ordem_servico.tecnico_id IN (?)';
                filterValues.push(filtros.tecnico_id);
            }
            if (filtros.data_inicial && filtros.data_inicial.length > 0) {
                query += ' AND ordem_servico.data_final IN (?)';
                filterValues.push(filtros.data_inicial);
            }
            if (filtros.data_final && filtros.data_final.length > 0) {
                query += ' AND ordem_servico.data_final IN (?)';
                filterValues.push(filtros.data_final);
            }
            if (filtros.feedback && filtros.feedback.length > 0) {
                query += ' AND ordem_servico.feedback IN (?)';
                filterValues.push(filtros.feedback);
            }

            query += `
            ORDER BY 
                CASE WHEN ordem_servico.status_os = 'Solicitada' THEN 0 ELSE 1 END,
                Prioridade.nivel_prioridade ASC,
                ordem_servico.id DESC
        `;

            mysql.query(query, filterValues, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    ordemServicoGetAll: (ordenar) => {
        return new Promise((resolve, reject) => {
            let orderby;
            if (ordenar === 'nivel_prioridade_D') {
                orderby = 'Prioridade.nivel_prioridade DESC';
            } else if (ordenar === 'nivel_prioridade_A') {
                orderby = 'Prioridade.nivel_prioridade ASC';
            } else if (ordenar === 'id_D') {
                orderby = 'ordem_servico.id DESC';
            } else if (ordenar === 'id_A') {
                 orderby = 'ordem_servico.id ASC';
            } else {
                orderby = 'ordem_servico.id DESC';
            }

            mysql.query(`
                SELECT
                    ordem_servico.*,
                    Prioridade.nivel_prioridade,
                    solicitante.nome AS solicitante_nome,
                    tecnico.nome AS tecnico_nome,
                    setor_principal.nome AS setor_principal_nome,
                    tipo_servico.nome AS tipo_servico_nome
                FROM ordem_servico
                LEFT JOIN Prioridade ON ordem_servico.id = Prioridade.ordem_servico_id
                LEFT JOIN usuario AS solicitante ON ordem_servico.solicitante_id = solicitante.id
                LEFT JOIN usuario AS tecnico ON ordem_servico.tecnico_id = tecnico.id
                LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id
                LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id
                ORDER BY ${orderby}
            `, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
     },

    /*ordemServicoGetAll: (ordenar) => {
        return new Promise((resolve, reject) => {
            let orderby;
            if (ordenar === 'nivel_prioridade_D') {
                orderby = 'Prioridade.nivel_prioridade DESC';eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyLCJub21lIjoiVGVjbmljbyIsImVtYWlsIjoidGVjbmljb0BnbWFpbC5jb20iLCJjYXJnbyI6IkFkbWluIiwiaWF0IjoxNzM0NjE3NDk3LCJleHAiOjE3MzUyMjIyOTd9.ug6Wxyp95jMCVBYLq8hLN1YkOqaz5Ga9ji3AW4Smsd0
            } else if (ordenar === 'nivel_prioridade_A') {
                orderby = 'Prioridade.nivel_prioridade ASC';
            } else if (ordenar === 'id_D') {
                orderby = 'ordem_servico.id DESC';
            } else if (ordenar === 'id_A') {
                orderby = 'ordem_servico.id ASC';
            } else {
                orderby = 'ordem_servico.id DESC';
            }
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyLCJub21lIjoiVGVjbmljbyIsImVtYWlsIjoidGVjbmljb0BnbWFpbC5jb20iLCJjYXJnbyI6IkFkbWluIiwiaWF0IjoxNzM0NjE3NDk3LCJleHAiOjE3MzUyMjIyOTd9.ug6Wxyp95jMCVBYLq8hLN1YkOqaz5Ga9ji3AW4Smsd0
            mysql.query(`
                SELECT
                    ordem_servico.*,
                    Prioridade.nivel_prioridade,
                    solicitante.nome AS solicitante_nome,
                    tecnico.nome AS tecnico_nome,
                    setor_principal.nome AS setor_principal_nome,
                    tipo_servico.nome AS tipo_servico_nome
                FROM ordem_servico
                LEFT JOIN Prioridade ON ordem_servico.id = Prioridade.ordem_servico_id
                LEFT JOIN usuario AS solicitante ON ordem_servico.solicitante_id = solicitante.id
                LEFT JOIN usuario AS tecnico ON ordem_servico.tecnico_id = tecnico.id
                LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id
                LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id
                ORDER BY ${orderby}
            `, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },*/
    
    ordemServicoGetById: (id) => {
        return new Promise((resolve, reject) => {
            mysql.query(`
            SELECT
            ordem_servico.*,
            solicitante.nome AS solicitante_nome,
            solicitante.email AS solicitante_email,
            tecnico.nome AS tecnico_nome,
            setor_principal.nome AS setor_principal_nome,
            CONCAT(
                CASE setor_secundario.bloco
                    WHEN 1 THEN 'A'
                    WHEN 2 THEN 'B'
                    WHEN 3 THEN 'C'
                    WHEN 4 THEN 'D'
                    WHEN 5 THEN 'E'
                    ELSE ''
                END,
                CASE
                    WHEN setor_secundario.bloco IS NOT NULL THEN ' - '
                    ELSE ''
                END,
                setor_secundario.nome
            ) AS setor_secundario_com_bloco,
            tipo_servico.nome AS tipo_servico_nome        
            FROM ordem_servico
            LEFT JOIN usuario AS solicitante ON ordem_servico.solicitante_id = solicitante.id
            LEFT JOIN usuario AS tecnico ON ordem_servico.tecnico_id = tecnico.id
            LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id
            LEFT JOIN setor_secundario ON ordem_servico.setor_secundario_id = setor_secundario.id
            LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id
            WHERE ordem_servico.id = ?
            ORDER BY ordem_servico.id DESC
            
        `,
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    ordemServicoGetBySolicitanteId: (solicitante_id) => {
        return new Promise((resolve, reject) => {
            mysql.query(`
            SELECT
            ordem_servico.*,
            solicitante.nome AS solicitante_nome,
            solicitante.email AS solicitante_email,
            tecnico.nome AS tecnico_nome,
            setor_principal.nome AS setor_principal_nome,
            CONCAT(
                CASE setor_secundario.bloco
                    WHEN 1 THEN 'A'
                    WHEN 2 THEN 'B'
                    WHEN 3 THEN 'C'
                    WHEN 4 THEN 'D'
                    WHEN 5 THEN 'E'
                    ELSE ''
                END,
                CASE
                    WHEN setor_secundario.bloco IS NOT NULL THEN ' - '
                    ELSE ''
                END,
                setor_secundario.nome
            ) AS setor_secundario_com_bloco,
            tipo_servico.nome AS tipo_servico_nome        
            FROM ordem_servico
            LEFT JOIN usuario AS solicitante ON ordem_servico.solicitante_id = solicitante.id
            LEFT JOIN usuario AS tecnico ON ordem_servico.tecnico_id = tecnico.id
            LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id
            LEFT JOIN setor_secundario ON ordem_servico.setor_secundario_id = setor_secundario.id
            LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id
            WHERE solicitante_id = ?
            ORDER BY ordem_servico.id DESC
        `,
            [solicitante_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    ordemServicoGetByTecnicoId: (tecnico_id) => {
        return new Promise((resolve, reject) => {
            mysql.query(`
            SELECT
            ordem_servico.*,
            solicitante.nome AS solicitante_nome,
            solicitante.email AS solicitante_email,
            tecnico.nome AS tecnico_nome,
            setor_principal.nome AS setor_principal_nome,
            CONCAT(
                CASE setor_secundario.bloco
                    WHEN 1 THEN 'A'
                    WHEN 2 THEN 'B'
                    WHEN 3 THEN 'C'
                    WHEN 4 THEN 'D'
                    WHEN 5 THEN 'E'
                    ELSE ''
                END,
                CASE
                    WHEN setor_secundario.bloco IS NOT NULL THEN ' - '
                    ELSE ''
                END,
                setor_secundario.nome
            ) AS setor_secundario_com_bloco,
            tipo_servico.nome AS tipo_servico_nome        
            FROM ordem_servico
            LEFT JOIN usuario AS solicitante ON ordem_servico.solicitante_id = solicitante.id
            LEFT JOIN usuario AS tecnico ON ordem_servico.tecnico_id = tecnico.id
            LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id
            LEFT JOIN setor_secundario ON ordem_servico.setor_secundario_id = setor_secundario.id
            LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id
            WHERE tecnico_id = ? AND status_os = "Aprovada"
            ORDER BY ordem_servico.nivel_prioridade ASC, ordem_servico.id ASC
        `,
            [tecnico_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    ordemServicoGetByPrioridade: (prioridade) => {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT ordem_servico.*, setor_principal.nome AS setor_principal_nome, setor_secundario.nome AS setor_secundario_nome, setor_secundario.bloco AS setor_secundario_bloco, tipo_servico.nome AS tipo_servico_nome FROM ordem_servico LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id LEFT JOIN setor_secundario ON ordem_servico.setor_secundario_id = setor_secundario.id LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id WHERE nivel_prioridade = ? ORDER BY ordem_servico.id DESC',
            [prioridade],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    ordemServicoGetByStatus: (status) => {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT ordem_servico.*, setor_principal.nome AS setor_principal_nome, setor_secundario.nome AS setor_secundario_nome, setor_secundario.bloco AS setor_secundario_bloco, tipo_servico.nome AS tipo_servico_nome FROM ordem_servico LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id LEFT JOIN setor_secundario ON ordem_servico.setor_secundario_id = setor_secundario.id LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id WHERE status_os = ? ORDER BY ordem_servico.id DESC',
            [status],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    ordemServicoGetByInstituicao: (instituicao) => {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT ordem_servico.*, setor_principal.nome AS setor_principal_nome, setor_secundario.nome AS setor_secundario_nome, setor_secundario.bloco AS setor_secundario_bloco, tipo_servico.nome AS tipo_servico_nome FROM ordem_servico LEFT JOIN setor_principal ON ordem_servico.setor_principal_id = setor_principal.id LEFT JOIN setor_secundario ON ordem_servico.setor_secundario_id = setor_secundario.id LEFT JOIN tipo_servico ON ordem_servico.tipo_servico_id = tipo_servico.id WHERE setor_principal_id = ? ORDER BY ordem_servico.id DESC',
            [instituicao],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    //Conferir o status_os aqui se faz sentido 
    solicitarOrdemServico: (solicitante_id, data_solicitacao, tipo_servico_id, descricao, setor_principal_id, setor_secundario_id, status_os) => {
        return new Promise((resolve, reject) => {
            mysql.query('INSERT INTO ordem_servico (solicitante_id, data_solicitacao, tipo_servico_id, descricao, setor_principal_id, setor_secundario_id, status_os) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [solicitante_id, data_solicitacao, tipo_servico_id, descricao, setor_principal_id, setor_secundario_id, status_os],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    //Conferir o status_os aqui se faz sentido 
    aprovarOrdemServico: (ordem_servico_id, nivel_prioridade, servico_terceirizado, tipo_servico_id, tecnico_id, descricao, setor_principal_id, setor_secundario_id, status_os) => {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT descricao, setor_principal_id, setor_secundario_id, tipo_servico_id FROM ordem_servico WHERE id = ?',
                [ordem_servico_id],
                (err, result) => {
                    if (err) return reject(err);
    
                    const { descricao: descricaoAtual, setor_principal_id: setorPrincipalAtual, setor_secundario_id: setorSecundarioAtual, tipo_servico_id: tipoServicoAtual } = result[0];
    
                    const novaDescricao = descricao || descricaoAtual;
                    const novoSetorPrincipal = setor_principal_id || setorPrincipalAtual;
                    const novoSetorSecundario = setor_secundario_id || setorSecundarioAtual;
                    const novoTipoServico = tipo_servico_id || tipoServicoAtual;
    
                    mysql.query('UPDATE ordem_servico SET nivel_prioridade = ?, servico_terceirizado = ?, tipo_servico_id = ?, tecnico_id = ?, descricao = ?, setor_principal_id = ?, setor_secundario_id = ?, status_os = ? WHERE id = ?',
                        [nivel_prioridade, servico_terceirizado, novoTipoServico, tecnico_id, novaDescricao, novoSetorPrincipal, novoSetorSecundario, status_os, ordem_servico_id],
                        (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        });
                });
        });
    },
    
    //Conferir o status_os aqui 
    rejeitarOrdemServico: (status_os, os_id) => {
        console.log(status_os, os_id);
        return new Promise((resolve, reject) => {
            mysql.query('UPDATE ordem_servico SET status_os = ? WHERE id = ?',
            [status_os, os_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },    
    //Conferir o status_os aqui 
    concluirOrdemServico: (ordem_servico_id, data_final, material, relatorio, status_os) => {
        return new Promise((resolve, reject) => {
            mysql.query('UPDATE ordem_servico SET data_final = ?, material = ?, relatorio = ?, status_os = ? WHERE id = ?',
            [data_final, material, relatorio, status_os, ordem_servico_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }, 
    //Alterar STATUS aqui
    finalizarOrdemServico: (ordem_servico_id, feedback, status_os) => {
        return new Promise((resolve, reject) => {
            mysql.query('UPDATE ordem_servico SET feedback = ?, status_os = ? WHERE id = ?',
            [feedback, status_os, ordem_servico_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    quantidadeByStatus: () => {
        
        return new Promise((resolve, reject) => {
            mysql.query(`
                SELECT
                COUNT(*) AS quantidade,
                status_os
                FROM ordem_servico
                GROUP BY status_os
            `, (err, results) => {
                if (err) return reject(err);
                
                let statusCounts = {
                    'Solicitada': 0,
                    'Aprovada': 0,
                    'Concluida': 0,
                    'Finalizada': 0,
                    'Rejeitada': 0,
                    'total': 0
                };
    
                for (let result of results) {
                    statusCounts[result.status_os] = result.quantidade;
                    statusCounts.total += result.quantidade;
                }
    
               
                statusCounts.total -= statusCounts['Rejeitada'];
    
                resolve(statusCounts);
            });
        }
    );
        
        
    }
}