import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from 'src/app/services/burger-api.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  categorias = ['hamburgueres', 'acompanhamentos', 'bebidas', 'sobremesas'];
  categoriaSelecionada: string = 'hamburgueres';

  produtoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.produtoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      ingredientes: [''],
      imagem_url: [''],
      fabricante: [''],
      descricao: [''],
    });

    this.adicionarCamposEspecificos('hamburgueres');
  }

  adicionarCamposEspecificos(categoria: string): void {
    this.removerCamposEspecificos(this.categoriaSelecionada);

    // Verifica se o controle já existe antes de adicioná-lo novamente
    if (categoria === 'hamburgueres' && !this.produtoForm.get('ingredientes')) {
      this.produtoForm.addControl('ingredientes', this.formBuilder.control(''));
    } else if (categoria === 'acompanhamentos' && !this.produtoForm.get('descricao')) {
      this.produtoForm.addControl('descricao', this.formBuilder.control(''));
    } else if (categoria === 'bebidas' && !this.produtoForm.get('fabricante')) {
      this.produtoForm.addControl('fabricante', this.formBuilder.control(''));
    } else if (categoria === 'sobremesas' && !this.produtoForm.get('descricao')) {
      this.produtoForm.addControl('descricao', this.formBuilder.control(''));
    }

    this.categoriaSelecionada = categoria;
  }

  cadastrarProduto() {
    if (this.produtoForm.valid) {
      const produtoData = this.produtoForm.value;



      const categoriaEndpoint = `${this.categoriaSelecionada}`;

      this.apiService.post(categoriaEndpoint, produtoData).subscribe(
        (response) => {
          alert('Produto Cadastrado');
        },
        (error) => {
          console.error('Erro ao cadastrar produto:', error);
        }
      );
    } else {
      console.log('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

  private removerCamposEspecificos(categoria: string): void {
    if (categoria === 'hamburgueres' && this.produtoForm.get('ingredientes')) {
      this.produtoForm.removeControl('ingredientes');
    } else if (categoria === 'acompanhamentos' && this.produtoForm.get('descricao')) {
      this.produtoForm.removeControl('descricao');
    } else if (categoria === 'bebidas' && this.produtoForm.get('fabricante')) {
      this.produtoForm.removeControl('fabricante');
    } else if (categoria === 'sobremesas' && this.produtoForm.get('descricao')) {
      this.produtoForm.removeControl('descricao');
    }
  }

   modoEdicao: boolean = false;


  alternarModoEdicao(): void {
    this.modoEdicao = !this.modoEdicao;

    this.produtoForm.reset();
  }
}
