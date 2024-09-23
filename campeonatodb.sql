create database campeonato;

use campeonato;

create table camparti(
    n_idenparti int not null auto_increment,
    c_mandparti varchar(100),
    c_visiparti varchar(100),
    n_rodaparti int,
    n_plcvparti int,
    n_plcmparti int,
    d_dataparti date,
    t_horaparti hour,
    c_diasparti varchar(15),
    c_vencparti varchar(100),
    c_arenparti varchar(100),
    primary key (n_idenparti)
);

create table camclube(
    n_idenclube int not null auto_increment,
    c_nomeclube varchar(100),
    c_estaclube varchar(50),
    primary key (n_idenclube)
);

create table camatlet(
    n_idenatlet int not null auto_increment,
    c_nomeatlet varchar(100),
    c_posiatlet varchar(50),
    n_camiatlet int,
    n_idenclube int,
    primary key (n_idenatlet)
);

create table camtrein(
    n_identrein int not null auto_increment,
    c_nometrein varchar(100),
    d_nasctrein date,
    c_nacitrein varchar(100),
    d_inictrein date,
    c_histtrein varchar(100),
    primary key (n_identrein),
);
