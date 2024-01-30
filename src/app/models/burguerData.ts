export interface Produto {
  identificador: number;
  id: number ;
  nome: string;
  preco: number;
  imagem_url: string;
  rota: string;
}

export interface Burguer extends Produto {
  ingredientes: string;
}

export interface Acompanhamento extends Produto {
  descricao: string;
}

export interface Bebida extends Produto {
  fabricante: string;
}

export interface Sobremesa extends Produto {
  descricao: string;
}
