import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { estatisticasData, golsData, partidaData, type cartoesData } from './types/types';

export class SQLConstructor {
    private static parseCSV<T>(content: string): T[] {
        const [headerLine, ...lines] = content.split('\n');
        const headers = headerLine.split(',').map(field => field.trim().replace(/^"|"$/g, ''));

        return lines.map(line => {
            const fields = line.split(',').map(field => field.trim().replace(/^"|"$/g, ''));
            return headers.reduce((acc, header, index) => {
                acc[header] = fields[index] as unknown as T[keyof T];
                return acc;
            }, {} as T);
        });
    }

    public static createPartida() {
        const csvPath = resolve('./data/campeonato-brasileiro-full.csv');
        const content = readFileSync(csvPath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<partidaData>(content);
        const requiredFields = new Set(['ID', 'rodata', 'data', 'hora', 'mandante', 'visitante', 'formacao_mandante', 'formacao_visitante', 'tecnico_mandante', 'tecnico_visitante', 'vencedor', 'arena', 'mandante_Placar', 'visitante_Placar', 'mandante_Estado', 'visitante_Estado']);

        let sql = `SET GLOBAL net_buffer_length = 1000000;\nSET GLOBAL max_allowed_packet = 1000000000;\n\nUSE brasileirao;\n\n`;
        
        sql += `INSERT INTO partidas (id_partida, rodada, horario, data_partida, mandante, visitante, formacao_mandante, formacao_visitante, tecnico_mandante, tecnico_visitante, vencedor, arena, mandante_placar, visitante_placar, estado_mandante, estado_visitante)\nVALUES\n` +
            rows.reduce<string[]>((acc, row) => {
                if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                    if (row.data) row.data = row.data.split('/').reverse().join('-');
                    acc.push(`\t(${row.ID}, ${row.rodata}, "${row.hora}", "${row.data}", "${row.mandante}", "${row.visitante}", "${row.formacao_mandante}", "${row.formacao_visitante}", "${row.tecnico_mandante}", "${row.tecnico_visitante}", "${row.vencedor}", "${row.arena}", ${row.mandante_Placar}, ${row.visitante_Placar}, "${row.mandante_Estado}", "${row.visitante_Estado}")`);
                }
                return acc;
            }, []).join(',\n') + ';';

        const sqlPath = resolve('./sql/insert_partidas.sql');
        writeFileSync(sqlPath, sql);
    }

    public static createGols() {
        const csvPath = resolve('./data/campeonato-brasileiro-gols.csv');
        const content = readFileSync(csvPath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<golsData>(content);
        const requiredFields = new Set(['partida_id', 'rodata', 'clube', 'atleta', 'minuto', 'tipo_de_gol']);

        let sql = `SET GLOBAL net_buffer_length = 1000000;\nSET GLOBAL max_allowed_packet = 1000000000;\n\nUSE brasileirao;\n\n`;

        sql += `INSERT INTO gols (id_gol, id_partida, rodada, clube, atleta, minuto, tipo_de_gol)\nVALUES\n` +
            rows.reduce<string[]>((acc, row) => {
                if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                    acc.push(`\t(NULL, ${row.partida_id}, ${row.rodata}, "${row.clube}", "${row.atleta}", "${row.minuto}", "${row.tipo_de_gol}")`);
                }
                return acc;
            }, []).join(',\n') + ';';

        const sqlPath = resolve('./sql/insert_gols.sql');
        writeFileSync(sqlPath, sql);
    }

    public static createCartoes() {
        const csvPath = resolve('./data/campeonato-brasileiro-cartoes.csv');
        const content = readFileSync(csvPath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<cartoesData>(content);
        const requiredFields = new Set(['partida_id', 'rodata', 'clube', 'cartao', 'atleta', 'num_camisa', 'posicao', 'minuto']);

        let sql = `SET GLOBAL net_buffer_length = 1000000;\nSET GLOBAL max_allowed_packet = 1000000000;\n\nUSE brasileirao;\n\n`;

        sql += `INSERT INTO cartoes (id_cartao, id_partida, rodada, clube, cartao, atleta, num_camisa, posicao, minuto)\nVALUES\n` +
            rows.reduce<string[]>((acc, row) => {
                if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                    if (!row.num_camisa) row.num_camisa = 'NULL';
                    acc.push(`\t(NULL, ${row.partida_id}, ${row.rodata}, "${row.clube}", "${row.cartao}", "${row.atleta}", ${row.num_camisa}, "${row.posicao}", "${row.minuto}")`);
                }
                return acc;
            }, []).join(',\n') + ';';

        const sqlPath = resolve('./sql/insert_cartoes.sql');
        writeFileSync(sqlPath, sql);
    }

    public static createEstatisticas() {
        const csvPath = resolve('./data/campeonato-brasileiro-estatisticas-full.csv');
        const content = readFileSync(csvPath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<estatisticasData>(content);
        const requiredFields = new Set(['partida_id', 'rodata', 'clube', 'chutes', 'chutes_no_alvo', 'posse_de_bola', 'passes', 'precisao_passes', 'faltas', 'cartao_amarelo', 'cartao_vermelho', 'impedimentos', 'escanteios']);

        let sql = `SET GLOBAL net_buffer_length = 1000000;\nSET GLOBAL max_allowed_packet = 1000000000;\n\nUSE brasileirao;\n\n`;

        sql += `INSERT INTO estatisticas (id_estatistica, id_partida, rodada, clube, chutes, chutes_a_gol, posse_de_bola, passes, precisao_passes, faltas, cartao_amarelo, cartao_vermelho, impedimentos, escanteios)\nVALUES\n` +
            rows.reduce<string[]>((acc, row) => {
                if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                    acc.push(`\t(NULL, ${row.partida_id}, ${row.rodata}, "${row.clube}", ${row.chutes}, ${row.chutes_no_alvo}, "${row.posse_de_bola}", ${row.passes}, "${row.precisao_passes}", ${row.faltas}, ${row.cartao_amarelo}, ${row.cartao_vermelho}, ${row.impedimentos}, ${row.escanteios})`);
                }
                return acc;
            }, []).join(',\n') + ';';

        const sqlPath = resolve('./sql/insert_estatisticas.sql');
        writeFileSync(sqlPath, sql);
    }
}

(() => {
    SQLConstructor.createPartida();
    SQLConstructor.createGols();
    SQLConstructor.createCartoes();
    SQLConstructor.createEstatisticas();
})();
