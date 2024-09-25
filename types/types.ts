type cartoesData = {
    partida_id: number;
    rodata: number;
    clube: string;
    cartao: string;
    atleta: string;
    num_camisa: string;
    posicao: string;
    minuto: string;
}

type partidaData = {
    ID: number;
    rodata: number;
    data: string;
    hora: string;
    mandante: string;
    visitante: string;
    formacao_mandante: string;
    formacao_visitante: string;
    tecnico_mandante: string;
    tecnico_visitante: string;
    vencedor: string;
    arena: string;
    mandante_Placar: number;
    visitante_Placar: number;
    mandante_Estado: string;
    visitante_Estado: string;
}

type golsData = {
    partida_id: number;
    rodata: number;
    clube: string;
    atleta: string;
    minuto: string;
    tipo_de_gol: string;
}

type estatisticasData = {
    partida_id: number;
    rodata: number;
    clube: string;
    chutes: number;
    chutes_no_alvo: number;
    posse_de_bola: string;
    passes: number;
    precisao_passes: string;
    faltas: number;
    cartao_amarelo: number;
    cartao_vermelho: number;
    impedimentos: number;
    escanteios: number;
}

export type{
    cartoesData,
    partidaData,
    golsData,
    estatisticasData
}