create database brasileirao;

use brasileirao;

create table partidas(
    id_partida int not null auto_increment,
    rodada int,
    horario time, 
    data_partida date, 
    mandante varchar(50),
    visitante varchar(50),
    formacao_mandante varchar(10),
    formacao_visitante varchar(10),
    tecnico_mandante varchar(100),
    tecnico_visitante varchar(100),
    vencedor varchar(50),
    arena varchar(50),
    mandante_placar int,
    visitante_placar int,
    estado_mandante varchar(2),
    estado_visitante varchar(2),
    primary key (id_partida)
);

create table clubes(
    id_clube int not null auto_increment,
    nome varchar(50),
    estado varchar(20),
    primary key (id_clube)
);

create table gols(
    id_gol int not null auto_increment,
    id_partida int,
    id_clube int,
    rodada int,
    atleta int,
    minuto varchar(4),
    primary key (id_gol),  
    foreign key (id_partida) references  partidas(id_partida),
    foreign key (id_clube) references clubes(id_clube)
);

create table cartoes(
    id_cartao int not null auto_increment,
    id_partida int,
    id_clube int,
    rodada int,
    cartão_tipo varchar(10),
    atleta varchar(100),
    num_camisa int,
    posicao varchar(20),
    minuto varchar(4),
    primary key (id_cartao),
    foreign key (id_partida) references partidas(id_partida),
    foreign key(id_clube) references clubes(id_clube)
);

create table estatisticas(
    id_estatistica int not null auto_increment,
    id_partida int,
    id_clube int,
    chutes int,
    chutes_a_gol int,
    posse_de_bola float(2,2),
    passes int,
    precisao_passes float(2,2),
    faltas int,
    cartao_amarelo int,
    cartao_vermelho int,
    impedimentos int,
    escanteios int,
    primary key (id_estatistica),
    foreign key (id_partida) references partidas(id_partida),
    foreign key(id_clube) references clubes(id_clube)
);
