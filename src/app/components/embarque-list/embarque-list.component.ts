import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { Embarque } from 'src/app/model/Embarque';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-embarque-list',
  templateUrl: './embarque-list.component.html',
  styleUrls: ['./embarque-list.component.css']
})
export class EmbarqueListComponent implements OnInit {

  assignedToMe: boolean = false;
  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listEmbarque=[];
  embarqueFilter = new Embarque('',null,'','','','','','','','','','','','','',null,null,'',null);

  constructor(
    private dialogService: DialogService,
    private embarqueService: EmbarqueService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.embarqueService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
        this.listEmbarque = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  filter(): void {
    console.log(' this.assignedToMe --> ',this.assignedToMe);
    this.page = 0;
    this.count = 5;
    this.embarqueService.findByParams(this.page,this.count,this.assignedToMe,this.embarqueFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.embarqueFilter.client = this.embarqueFilter.client == 'uninformed' ? "" : this.embarqueFilter.client;
      this.embarqueFilter.prioridade = this.embarqueFilter.prioridade == 'uninformed' ? "" : this.embarqueFilter.prioridade;
      this.embarqueFilter.numero = this.embarqueFilter.numero == 0 ? null : this.embarqueFilter.numero;  
      this.listEmbarque = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cleanFilter(): void {
    this.assignedToMe = false;
    this.page = 0;
    this.count = 5;
    this.embarqueFilter = new Embarque('',null,'','','','','','','','','','','','','',null,null,'',null);
    this.findAll(this.page,this.count);
  }


  edit(id:string){
    this.router.navigate(['/embarque-new',id]);
  }

  detail(id:string){
    this.router.navigate(['/embarque-detail',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Deseja Excluir o Embarque ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.embarqueService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findAll(this.page,this.count);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
  }
  
}
