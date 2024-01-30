import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  selected: string = 'hamburguer';

  mudarValor(novoValor: string) {
    this.selected = novoValor;
  }

}
