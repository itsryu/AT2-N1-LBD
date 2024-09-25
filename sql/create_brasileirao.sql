CREATE DATABASE IF NOT EXISTS brasileirao
DEFAULT CHARACTER SET = 'utf8'
DEFAULT COLLATE = 'utf8_general_ci';

USE brasileirao;

CREATE TABLE IF NOT EXISTS partidas (
    id_partida INT AUTO_INCREMENT,
    rodada INT NOT NULL,
    horario TIME NOT NULL,
    data_partida DATE NOT NULL,
    mandante VARCHAR(50) NOT NULL,
    visitante VARCHAR(50) NOT NULL,
    formacao_mandante VARCHAR(10),
    formacao_visitante VARCHAR(10),
    tecnico_mandante VARCHAR(100),
    tecnico_visitante VARCHAR(100),
    vencedor VARCHAR(50),
    arena VARCHAR(100),
    mandante_placar INT,
    visitante_placar INT,
    estado_mandante VARCHAR(2),
    estado_visitante VARCHAR(2),
    PRIMARY KEY (id_partida),
    INDEX idx_rodada (rodada),
    INDEX idx_data_partida (data_partida)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS gols (
    id_gol INT AUTO_INCREMENT,
    id_partida INT NOT NULL,
    rodada INT NOT NULL,
    clube VARCHAR(100) NOT NULL,
    atleta VARCHAR(100) NOT NULL,
    minuto VARCHAR(4) NOT NULL,
    tipo_de_gol VARCHAR(30),
    PRIMARY KEY (id_gol),
    FOREIGN KEY (id_partida) REFERENCES partidas (id_partida) ON DELETE CASCADE,
    INDEX idx_id_partida (id_partida)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS cartoes (
    id_cartao INT AUTO_INCREMENT,
    id_partida INT NOT NULL,
    rodada INT NOT NULL,
    clube VARCHAR(100) NOT NULL,
    cartao VARCHAR(10) NOT NULL,
    atleta VARCHAR(100) NOT NULL,
    num_camisa INT DEFAULT NULL,
    posicao VARCHAR(20) DEFAULT NULL,
    minuto VARCHAR(5) NOT NULL,
    PRIMARY KEY (id_cartao),
    FOREIGN KEY (id_partida) REFERENCES partidas (id_partida) ON DELETE CASCADE,
    INDEX idx_id_partida (id_partida)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS estatisticas (
    id_estatistica INT AUTO_INCREMENT,
    id_partida INT NOT NULL,
    rodada INT NOT NULL,
    clube VARCHAR(100) NOT NULL,
    chutes INT NOT NULL,
    chutes_a_gol INT NOT NULL,
    posse_de_bola VARCHAR(4),
    passes INT NOT NULL,
    precisao_passes VARCHAR(4),
    faltas INT NOT NULL,
    cartao_amarelo INT NOT NULL,
    cartao_vermelho INT NOT NULL,
    impedimentos INT NOT NULL,
    escanteios INT NOT NULL,
    PRIMARY KEY (id_estatistica),
    FOREIGN KEY (id_partida) REFERENCES partidas (id_partida) ON DELETE CASCADE,
    INDEX idx_id_partida (id_partida)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS clubes (
    id_clube INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    PRIMARY KEY (id_clube),
    UNIQUE INDEX idx_nome (nome)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';