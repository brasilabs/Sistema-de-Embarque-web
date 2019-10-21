import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';
import { Embarque } from 'src/app/model/Embarque';
import { EmbarqueService } from 'src/app/services/embarque.service';

@Component({
  selector: 'app-embarque-detail',
  templateUrl: './embarque-detail.component.html',
  styleUrls: ['./embarque-detail.component.css']
})
export class EmbarqueDetailComponent implements OnInit {

  @ViewChild("form", {static:false})
  form: NgForm;

  embarque = new Embarque('',0,'','','','','','','','','','','','','',null,null,'',null);
  shared : SharedService;
  message : {};
  classCss : {};

  constructor(
    private embarqueService: EmbarqueService,
    private route: ActivatedRoute) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    console.log('id --> ',id);
    this.embarqueService.findById(id).subscribe((responseApi:ResponseApi) => {
      console.log('responseApi -->  ',responseApi);
      this.embarque = responseApi.data;
      this.embarque.date = new Date(this.embarque.date).toISOString();
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.embarqueService.createOrUpdate(this.embarque).subscribe((responseApi:ResponseApi) => {
        this.embarque = new Embarque('',0,'','','','','','','','','','','','','',null,null,'',null);
        let embarque : Embarque = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${embarque.client} successfully`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
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

   changeStatus(status:string): void{
    this.embarqueService.changeStatus(status,this.embarque).subscribe((responseApi:ResponseApi) => {
        this.embarque = responseApi.data;
        this.embarque.date = new Date(this.embarque.date).toISOString();
        this.showMessage({
          type: 'success',
          text: 'Successfully changed status'
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }
}