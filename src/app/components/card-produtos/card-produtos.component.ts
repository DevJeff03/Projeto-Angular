import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/burger-api.service';
import { Acompanhamento, Bebida, Burguer, Sobremesa } from 'src/app/models/burguerData'

@Component({
  selector: 'app-card-produtos',
  templateUrl: './card-produtos.component.html',
  styleUrls: ['./card-produtos.component.css']
})


export class CardProdutosComponent implements OnInit {
  produtos: any[] = [];
  tipoProdutoSelecionado: string = 'hamburgueres';

  selectedProduto: Burguer | null = null;

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    // Lógica para carregar produtos com base no tipoProdutoSelecionado
    switch (this.tipoProdutoSelecionado) {
      case 'hamburgueres':
        this.service.getBurguer("hamburgueres").subscribe({
          next: (res: Burguer[] | Burguer) => {
            this.produtos = Array.isArray(res) ? res : [res];
          },
          error: (err) => console.log(err)
        });
        break;
      case 'acompanhamentos':
        this.service.getAcomp("acompanhamentos").subscribe({
          next: (res: Acompanhamento[] | Acompanhamento) => {
            this.produtos = Array.isArray(res) ? res : [res];
          },
          error: (err) => console.log(err)
        });
        break;
      case 'bebidas':
        this.service.getBebida("bebidas").subscribe({
          next: (res: Bebida[] | Bebida) => {
            this.produtos = Array.isArray(res) ? res : [res];
          },
          error: (err) => console.log(err)
        });
        break;
      case 'sobremesas':
        this.service.getSobremesa("sobremesas").subscribe({
          next: (res: Sobremesa[] | Sobremesa) => {
            this.produtos = Array.isArray(res) ? res : [res];
          },
          error: (err) => console.log(err)
        });
        break;
      default:
        break;
    }
  }

  selecionarTipoProduto(tipo: string) {
    this.tipoProdutoSelecionado = tipo;
    this.carregarProdutos();
  }

}
