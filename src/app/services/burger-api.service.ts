import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment'
import { Acompanhamento, Bebida, Burguer, Produto, Sobremesa } from 'src/app/models/burguerData'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseURL:string = ""
  private burgerDados: Burguer | any
  private acompDados: Acompanhamento | any
  private dadosBebidas: Bebida | any
  private DadosSobremesa: Sobremesa | any

  constructor(private http: HttpClient) {
    this.baseURL = environment.bestBurguer
  }

  getBurguer(burguerDados: string):Observable<Burguer>{
    this.burgerDados = this.http.get<Burguer>(`${this.baseURL}${burguerDados}`)
    return this.burgerDados
  }

  getAcomp(AcompDados: string):Observable<Acompanhamento>{
    this.acompDados = this.http.get<Acompanhamento>(`${this.baseURL}${AcompDados}`)
    return this.acompDados
  }

  getBebida(DadosBebidas: string):Observable<Bebida>{
    this.dadosBebidas = this.http.get<Bebida>(`${this.baseURL}${DadosBebidas}`)
    return this.dadosBebidas
  }

  getSobremesa(DadosSobremesas: string):Observable<Sobremesa>{
    this.DadosSobremesa = this.http.get<Sobremesa>(`${this.baseURL}${DadosSobremesas}`)
    return this.DadosSobremesa
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseURL}${endpoint}`;
    return this.http.post(url, data);
  }

  putProduto(id: string, produto: Produto): Observable<any> {
    const url = `${this.baseURL}${id}`;
    return this.http.put(url, produto);
  }

  deleteProduto(id:string): Observable<any> {
    const url = `${this.baseURL}${id}`;
    return this.http.delete(url);
  }

}
