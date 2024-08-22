CREATE TABLE IF NOT EXISTS os_img (
    id INT AUTO_INCREMENT PRIMARY KEY,
    os_id INT,
    img_key VARCHAR(255),
    img_type ENUM('1','2'),
    FOREIGN KEY (os_id) REFERENCES ordem_servico(id)
);

ALTER TABLE ordem_servico 
MODIFY COLUMN status_os ENUM('Solicitada', 'Aprovada', 'Concluida', 'Finalizada', 'Rejeitada');