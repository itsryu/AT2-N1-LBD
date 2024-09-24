CREATE DATABASE IF NOT EXISTS brasileirao
DEFAULT CHARACTER SET = 'utf8'
DEFAULT COLLATE = 'utf8_general_ci';

USE brasileirao;

CREATE TABLE IF NOT EXISTS partidas (
    id_partida INT NOT NULL AUTO_INCREMENT,
    rodada INT,
    horario TIME,
    data_partida DATE,
    mandante VARCHAR(50),
    visitante VARCHAR(50),
    formacao_mandante VARCHAR(10),
    formacao_visitante VARCHAR(10),
    tecnico_mandante VARCHAR(100),
    tecnico_visitante VARCHAR(100),
    vencedor VARCHAR(50),
    arena VARCHAR(50),
    mandante_placar INT,
    visitante_placar INT,
    estado_mandante VARCHAR(2),
    estado_visitante VARCHAR(2),
    PRIMARY KEY (id_partida)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS clubes (
    id_clube INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50),
    estado VARCHAR(20),
    PRIMARY KEY (id_clube)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS gols (
    id_gol INT NOT NULL AUTO_INCREMENT,
    id_partida INT,
    id_clube INT,
    rodada INT,
    atleta VARCHAR(100),
    minuto VARCHAR(4),
    PRIMARY KEY (id_gol),
    FOREIGN KEY (id_partida) REFERENCES partidas (id_partida),
    FOREIGN KEY (id_clube) REFERENCES clubes (id_clube)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS cartoes (
    id_cartao INT NOT NULL AUTO_INCREMENT,
    id_partida INT,
    clube VARCHAR(50),
    rodada INT,
    cartao_tipo VARCHAR(10),
    atleta VARCHAR(100),
    num_camisa INT,
    posicao VARCHAR(20),
    minuto VARCHAR(4),
    PRIMARY KEY (id_cartao),
    FOREIGN KEY (id_partida) REFERENCES partidas (id_partida)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';

CREATE TABLE IF NOT EXISTS estatisticas (
    id_estatistica INT NOT NULL AUTO_INCREMENT,
    id_partida INT,
    id_clube INT,
    chutes INT,
    chutes_a_gol INT,
    posse_de_bola FLOAT,
    passes INT,
    precisao_passes FLOAT,
    faltas INT,
    cartao_amarelo INT,
    cartao_vermelho INT,
    impedimentos INT,
    escanteios INT,
    PRIMARY KEY (id_estatistica),
    FOREIGN KEY (id_partida) REFERENCES partidas (id_partida),
    FOREIGN KEY (id_clube) REFERENCES clubes (id_clube)
) DEFAULT CHARSET = 'utf8' DEFAULT COLLATE = 'utf8_general_ci';
