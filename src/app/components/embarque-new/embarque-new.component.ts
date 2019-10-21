import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { Embarque } from 'src/app/model/Embarque';
import { SharedService } from './../../services/shared.service';
import { NgForm } from '@angular/forms';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-embarque-new',
  templateUrl: './embarque-new.component.html',
  styleUrls: ['./embarque-new.component.css']
})
export class EmbarqueNewComponent implements OnInit {

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
    this.embarqueService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.embarque = responseApi.data;
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

}
