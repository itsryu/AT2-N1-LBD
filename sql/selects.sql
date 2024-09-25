SELECT * FROM cartoes WHERE clube ='Flamengo';
SELECT * FROM gols WHERE clube = 'Flamengo' AND atleta = 'Alecsandro';
SELECT * FROM partidas WHERE rodada = 38;
SELECT * FROM gols WHERE tipo_de_gol ='Gol Contra';

-- Melhor clube por rodada;
SELECT p.rodada, p.vencedor, COUNT(*) AS vitorias
FROM partidas p
WHERE p.vencedor IS NOT NULL AND p.vencedor <> '-'
GROUP BY p.rodada, p.vencedor
ORDER BY p.rodada, vitorias DESC;

-- Gols por clube ordenados;
SELECT g.clube, COUNT(g.id_gol) AS total
FROM gols g
GROUP BY g.clube
ORDER BY total DESC;

-- Estatísticas de cartões por clube;
SELECT c.nome, 
       AVG(est.cartao_amarelo) AS media_cartao_amarelo,
       AVG(est.cartao_vermelho) AS media_cartao_vermelho
FROM clubes c
JOIN estatisticas est ON c.id_clube = est.id_clube
GROUP BY c.nome
ORDER BY media_cartao_amarelo DESC;

-- Jogos com mais gols por partida;
SELECT p.id_partida, p.mandante, p.visitante, (p.mandante_placar + p.visitante_placar) AS total_gols
FROM partidas p
ORDER BY total_gols DESC;

-- Total de faltas por clube
SELECT c.nome, SUM(est.faltas) AS total_faltas
FROM clubes c
JOIN estatisticas est ON c.id_clube = est.id_clube
GROUP BY c.nome
ORDER BY total_faltas DESC;
