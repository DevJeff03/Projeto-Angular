import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acompanhamento, Bebida, Burguer, Produto, Sobremesa } from 'src/app/models/burguerData'
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/burger-api.service';

@Component({
  selector: 'app-exclusao-itens',
  templateUrl: './exclusao-itens.component.html',
  styleUrls: ['./exclusao-itens.component.css']
})
export class ExclusaoItensComponent implements OnInit {
  produtos: any[] = [];
  tipoProdutoSelecionado: string = 'hamburgueres';
  produtoSelecionado: any = null;


  selectedProduto: Burguer | null = null;

  constructor(private authService: AuthService, private router: Router, private service: ApiService) {}

  ngOnInit() {
    this.checkAuthentication();
    this.carregarProdutos();
  }

  checkAuthentication() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  carregarProdutos() {
    switch (this.tipoProdutoSelecionado) {
      case 'hamburgueres':
        this.service.getBurguer("hamburgueres").subscribe({
          next: (res: Burguer[] | Burguer) => {
            this.produtos = Array.isArray(res) ? res.map(item => ({...item, rota: 'hamburguer'})) : [{...res, rota: 'hamburguer'}];
          },
          error: (err) => console.log(err)
        });
        break;
      case 'acompanhamentos':
        this.service.getAcomp("acompanhamentos").subscribe({
          next: (res: Acompanhamento[] | Acompanhamento) => {
            this.produtos = Array.isArray(res) ? res.map(item => ({...item, rota: 'acompanhamento'})) : [{...res, rota: 'acompanhamento'}];
          },
          error: (err) => console.log(err)
        });
        break;
      case 'bebidas':
        this.service.getBebida("bebidas").subscribe({
          next: (res: Bebida[] | Bebida) => {
            this.produtos = Array.isArray(res) ? res.map(item => ({...item, rota: 'bebida'})) : [{...res, rota: 'bebida'}];
          },
          error: (err) => console.log(err)
        });
        break;
      case 'sobremesas':
        this.service.getSobremesa("sobremesas").subscribe({
          next: (res: Sobremesa[] | Sobremesa) => {
            this.produtos = Array.isArray(res) ? res.map(item => ({...item, rota: 'sobremesa'})) : [{...res, rota: 'sobremesa'}];
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

  excluirProduto(produto: Produto): void {
    const confirmacao = window.confirm('Deseja realmente excluir este produto ?');

    if (confirmacao) {
      this.service.deleteProduto(`${produto.rota}/${produto.id}`).subscribe(
        (res) => {
          console.log('Produto atualizado com sucesso:', res);
          this.carregarProdutos()
        },
        (err) => {
          console.error('Erro ao atualizar o produto:', err);
        }
      );
    } else {
      console.log('Alterações canceladas pelo usuário.');
    }

  }
}
