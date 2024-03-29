import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
notes : any = []
inputImage = false;
hover : boolean = false;

  constructor(private service: AppService) {
    this.readAll();
   }

   readAll(){
     this.notes = [];
    this.service.getRequest('readnote').subscribe((data: any) => {
      data.data.forEach(element => {
        if(element.isTrash == true){
          this.notes.push(element);
        }
      });
    }) 
   }

   trash(data) {
    this.service.deleteRequest('deletenote', data._id).subscribe((data: any) => {
      console.log(data);
      this.readAll()
    })
   }

   restore(data) {
     data.isTrash = false;
    this.service.updateRequest('updatenote', data._id, data).subscribe((data: any) => {
      console.log(data);
      this.readAll();
    })
   }

  ngOnInit() {
    this.notes.forEach(element => {
      if(element.image != null){
        this.inputImage = true;
      }  
    });
    
  }

}
