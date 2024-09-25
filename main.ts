import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { estatisticasData, golsData, partidaData, type cartoesData } from './types/types';

export class SQLConstructor {
    public static parseCSV<T>(content: string): T[] {
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
        const csvFilePath = resolve('./datasets/campeonato-brasileiro-full.csv');
        const fileContent = readFileSync(csvFilePath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<partidaData>(fileContent);
        const requiredFields = new Set(['ID', 'rodata', 'data', 'hora', 'mandante', 'visitante', 'formacao_mandante', 'formacao_visitante', 'tecnico_mandante', 'tecnico_visitante', 'vencedor', 'arena', 'mandante_Placar', 'visitante_Placar', 'mandante_Estado', 'visitante_Estado']);
        
        const sql = rows.reduce<string[]>((acc, row) => {
            if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                if (row.data) row.data = row.data.split('/').reverse().join('-');
                acc.push(`INSERT INTO partidas (id_partida, rodada, horario, data_partida, mandante, visitante, formacao_mandante, formacao_visitante, tecnico_mandante, tecnico_visitante, vencedor, arena, mandante_placar, visitante_placar, estado_mandante, estado_visitante) VALUES (${row.ID}, ${row.rodata}, "${row.hora}", "${row.data}", "${row.mandante}", "${row.visitante}", "${row.formacao_mandante}", "${row.formacao_visitante}", "${row.tecnico_mandante}", "${row.tecnico_visitante}", "${row.vencedor}", "${row.arena}", ${row.mandante_Placar}, ${row.visitante_Placar}, "${row.mandante_Estado}", "${row.visitante_Estado}");`);
            }
            return acc;
        }, []).join('\n');

        const sqlFilePath = resolve('./sql/insert_partidas.sql');
        writeFileSync(sqlFilePath, sql);
    }

    public static createGols() {
        const csvFilePath = resolve('./datasets/campeonato-brasileiro-gols.csv');
        const fileContent = readFileSync(csvFilePath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<golsData>(fileContent);
        const requiredFields = new Set(['partida_id', 'rodata', 'clube', 'atleta', 'minuto', 'tipo_de_gol']);
        
        const sql = rows.reduce<string[]>((acc, row) => {
            if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                acc.push(`INSERT INTO gols (id_partida, rodada, clube, atleta, minuto, tipo_de_gol) VALUES (${row.partida_id}, ${row.rodata}, "${row.clube}", "${row.atleta}", "${row.minuto}", "${row.tipo_de_gol}");`);
            }
            return acc;
        }, []).join('\n');

        const sqlFilePath = resolve('./sql/insert_gols.sql');
        writeFileSync(sqlFilePath, sql);
    }

    public static createCartoes() {
        const csvFilePath = resolve('./datasets/campeonato-brasileiro-cartoes.csv');
        const fileContent = readFileSync(csvFilePath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<cartoesData>(fileContent);
        const requiredFields = new Set(['partida_id', 'rodata', 'clube', 'cartao', 'atleta', 'num_camisa', 'posicao', 'minuto']);
        
        const sql = rows.reduce<string[]>((acc, row) => {
            if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                acc.push(`INSERT INTO cartoes (id_partida, rodada, clube, cartao, atleta, num_camisa, posicao, minuto) VALUES (${row.partida_id}, ${row.rodata}, "${row.clube}", "${row.cartao}", "${row.atleta}", ${row.num_camisa}, "${row.posicao}", "${row.minuto}");`);
            }
            return acc;
        }, []).join('\n');

        const sqlFilePath = resolve('./sql/insert_cartoes.sql');
        writeFileSync(sqlFilePath, sql);
    }

    public static createEstatisticas() {
        const csvFilePath = resolve('./datasets/campeonato-brasileiro-estatisticas-full.csv');
        const fileContent = readFileSync(csvFilePath, { encoding: 'utf-8' });
        const rows = SQLConstructor.parseCSV<estatisticasData>(fileContent);
        const requiredFields = new Set(['partida_id', 'rodata', 'clube', 'chutes', 'chutes_no_alvo', 'posse_de_bola', 'passes', 'precisao_passes', 'faltas', 'cartao_amarelo', 'cartao_vermelho', 'impedimentos', 'escanteios']);
        
        const sql = rows.reduce<string[]>((acc, row) => {
            if ([...requiredFields].every(field => (row)[field] !== undefined)) {
                acc.push(`INSERT INTO estatisticas (id_partida, rodada, clube, chutes, chutes_a_gol, posse_de_bola, passes, precisao_passes, faltas, cartao_amarelo, cartao_vermelho, impedimentos, escanteios) VALUES (${row.partida_id}, ${row.rodata}, "${row.clube}", ${row.chutes}, ${row.chutes_no_alvo}, "${row.posse_de_bola}", ${row.passes}, "${row.precisao_passes}", ${row.faltas}, ${row.cartao_amarelo}, ${row.cartao_vermelho}, ${row.impedimentos}, ${row.escanteios});`);
            }
            return acc;
        }, []).join('\n');

        const sqlFilePath = resolve('./sql/insert_estatisticas.sql');
        writeFileSync(sqlFilePath, sql);
    }
}

(() => {
    SQLConstructor.createEstatisticas();
})();
