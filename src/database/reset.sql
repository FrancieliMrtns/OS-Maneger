CREATE DATABASE IF NOT EXISTS synapse_os_v2;

USE synapse_os_v2;

CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255),
    terceirizado BOOLEAN,
    empresa VARCHAR(255),
	cargo ENUM('Admin', 'Tecnico', 'Solicitante', 'Bloqueado'),
    tipo_servico_id INT,
    data_insercao DATE,
    FOREIGN KEY (tipo_servico_id) REFERENCES tipo_servico(id)
);

CREATE TABLE IF NOT EXISTS ordem_servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitante_id INT,
    data_solicitacao DATE,
    descricao TEXT,
    setor_principal_id INT,
    setor_secundario_id INT,
    status_os ENUM('Solicitada', 'Aprovada', "Concluida ", 'Finalizada', 'Rejeitada'),
    nivel_prioridade ENUM('P1 - 1 dia', 'P2 - 2 dias', 'P3 - 4 dias', 'P4 - 7 dias', 'P5 - 10 dias', 'P6 - 15 dias', 'P7 - 25 dias'),
    servico_terceirizado BOOLEAN,
    tipo_servico_id INT,
    tecnico_id INT,
    data_final DATE,
    material VARCHAR(255),
    relatorio TEXT,
    feedback ENUM('Ruim', 'Regular', 'Bom', 'Ótimo', 'Excelente'),
    FOREIGN KEY (setor_principal_id) REFERENCES setor_principal(id),
    FOREIGN KEY (setor_secundario_id) REFERENCES setor_secundario(id),
    FOREIGN KEY (tipo_servico_id) REFERENCES tipo_servico(id),
    FOREIGN KEY (solicitante_id) REFERENCES usuario(id),
    FOREIGN KEY (tecnico_id) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS os_img (
    id INT AUTO_INCREMENT PRIMARY KEY,
    os_id INT,
    img_key VARCHAR(255),
    img_type ENUM('1','2'),
    FOREIGN KEY (os_id) REFERENCES ordem_servico(id)
);

CREATE TABLE IF NOT EXISTS tipo_servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255)
);

INSERT INTO tipo_servico (nome) VALUES ('Civil');
INSERT INTO tipo_servico (nome) VALUES ('Hidráulica');
INSERT INTO tipo_servico (nome) VALUES ('Elétrica');
INSERT INTO tipo_servico (nome) VALUES ('Pintura');
INSERT INTO tipo_servico (nome) VALUES ('Mecânica');
INSERT INTO tipo_servico (nome) VALUES ('Mobiliário');
INSERT INTO tipo_servico (nome) VALUES ('Ar-Condicionado');
INSERT INTO tipo_servico (nome) VALUES ('Eletrônicos');
INSERT INTO tipo_servico (nome) VALUES ('Outros ');

CREATE TABLE IF NOT EXISTS setor_principal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255)
);

INSERT INTO setor_principal (nome) VALUES ('FSNT Geral');
INSERT INTO setor_principal (nome) VALUES ('Fatec');
INSERT INTO setor_principal (nome) VALUES ('Senai');
INSERT INTO setor_principal (nome) VALUES ('CSN');

CREATE TABLE IF NOT EXISTS setor_secundario  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    bloco TINYINT,
    setor_principal_id  INT,
    FOREIGN KEY (setor_principal_id) REFERENCES setor_principal(id)
);

/* Todos os locais --> FSNT GERAL */
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Lab. Solos', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Horta', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Portaria', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Estacionamento Externo', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Residencias', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Lab. Mlpp', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Hotel', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Memorial', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Oficina Mecânica', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Oficina de Tratores', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Almoxarifado', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Garagem de Tratores', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Centro de Inovação', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Cabines Elétricas', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Represas', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Quiosque', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Campo', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Cerâmica', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Caixas de Abastecimento Água', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Ginásio', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Lago', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Refeitório', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Vias de Acesso', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Estacionamento Interno', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Estacionamento Ginásio', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Anfiteatro', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Sala de Reunião', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Administrativo', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Superintendência', 1);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Outros', 1);

/* Todos os locais --> FATEC */
/* Bloco A */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Secretaria', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Salas de Aula', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sanitários', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Diretoria', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Diretoria de Serviços', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Cordenação', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sala de Professores', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Cozinha', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Copa', 1, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Outros', 1, 2);
/* Bloco B */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Salas de Aula', 2, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Laboratórios', 2, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Gabinetes', 2, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sanitários', 2, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Outros', 2, 2);
/* Bloco C */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Biblioteca', 3, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sanitários', 3, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Almoxarifado', 3, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Cantina', 3, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Outros', 3, 2);
/* Bloco D */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Salas de Aula', 4, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sanitários', 4, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sala dos Professores', 4, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Laboratórios', 4, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Depósitos', 4, 2);
/* Bloco E */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Salas de Estudo', 5, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Laboratórios', 5, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sanitários', 5, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Almoxarifado', 5, 2);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Coordenação', 5, 2);

/* Todos os locais --> SENAI */
/* Bloco A */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Salas de Aula', 1, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Diretoria', 1, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Administrativo', 1, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Coordenação', 1, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Secretaria', 1, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Auditório', 1, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Depósito', 1, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sala de Reunião', 1, 3);
/* Bloco B */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Laboratórios', 2, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Depósito', 2, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Biblioteca', 2, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Refeitório', 2, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sala de Aulas', 2, 3);
/* Bloco C */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sala dos Professores', 3, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Arquivo', 3, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Laboratório', 3, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sala de Aula', 3, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Depósito', 3, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Espaço Musical', 3, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Espaço Artístico', 3, 3);
/* Bloco D */
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Sala de Aula', 4, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Depósito', 4, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Laboratório', 4, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Coordenação', 4, 3);
INSERT INTO setor_secundario (nome, bloco, setor_principal_id) VALUES ('Oficina', 4, 3);

/* Todos os locais --> CSN */
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Salas de Aula', 4);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Diretoria', 4);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Administrativo', 4);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Coordenação', 4);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Secretaria', 4);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Auditório', 4);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Depósito', 4);
INSERT INTO setor_secundario (nome, setor_principal_id) VALUES ('Sala de Reunião', 4);