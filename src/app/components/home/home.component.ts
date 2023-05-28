import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataServiceService } from '../../services/data-service.service';
import { CreateLabelDialogComponent } from '../create-label-dialog/create-label-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppService } from '../../services/app.service';
import { ChangeImageDialogComponent } from '../change-image-dialog/change-image-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private data: DataServiceService, public dialog: MatDialog, private service: AppService) { }

  raw_data
  firstCharacter = '';
  name : string = '';
  email = ''
  sign = false;
  shiftDiv = false;
  view=false;
  label : any = [];
  labels : any = [];
  searchData = {
    data:''
  };
  profilePicShow = false;
  profilePicData = '';
  isSidenavOpen : boolean = false;
  ngOnInit() {
    this.zindex();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token')!);
    this.raw_data = decodedToken;
    localStorage.setItem('name',this.raw_data.name);
    localStorage.setItem('id',this.raw_data.data);
    var user = localStorage.getItem('name')!;
    this.firstCharacter = user[0];
    console.log(this.data);
    this.data.currentMessage.subscribe(message => this.view=message);
    this.service.getRequest('getLabels').subscribe((data: any) => {
      data.label.forEach(element => {
        this.labels.push(element.name);  
      });
    })
    
    if(this.raw_data.profilePicture != '' || this.raw_data.profilePicture != null) {
      this.profilePicShow = !this.profilePicShow;
      this.profilePicData = this.raw_data.profilePicture;
    }
    // this.raw_data.label.forEach(element => {
    //   this.labels.push(element.name);
    // });
    console.log(this.searchData.data);

  }

  name1 = "Google"
  name2 = "Keep"
  zindex(){
    const myDiv = document.getElementById('toolbar') as HTMLDivElement;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 768) { // Change 768 to your desired viewport width
      myDiv.style.zIndex = '5'; // Set a higher z-index value
    } else {
      myDiv.style.zIndex = '2'; // Reset the z-index value
    }
  }
  notes() {
    this.name1 = "Google"
    this.name2 = "Keep"
    this.router.navigate(['home/notes']);
    console.log(this.raw_data);
    
  }

  reminders() {
    this.name1 = "Reminders"
    this.name2 = ""
    this.router.navigate(['home/reminders']);
  }

  archive() {
    this.name1 = "Archive"
    this.name2 = ""
    this.router.navigate(['home/archive']);
  }

  trash() {
    this.name1 = "Trash"
    this.name2 = ""
    this.router.navigate(['home','trash']);
  }

  signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['']);
  }

  signoutCard() {
    if(this.sign){
      this.sign = false;
    } else {
      this.sign = true;
    }
    this.name =  this.raw_data.name;
    this.email = this.raw_data.email;
  } 

  labelEdit() {
      console.log(this.data);
      const dialogRef = this.dialog.open(CreateLabelDialogComponent, {
        width: '300px',
        data: this.labels,
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.label = [];
        this.labels.forEach(element => {
          this.label.push({
            "name":element 
          })  
        });
        // this.label.push({
        //   "name":result.labelName
        // })
        console.log(this.label);
        this.service.updateRequest('updateuser', localStorage.getItem('id'), this.label).subscribe((data:any) => {
          console.log(data);
        })
      });
    }
  
  customLabel(item) {
    // this.name1 = "Label"
    // this.name2 = ""
    this.data.labelName(item);
    this.router.navigate(['home','label',item]);
  }

  shift(){
    if(this.shiftDiv){
      this.shiftDiv = false;
    } else {
      this.shiftDiv = true;
    }
  }

  toggleView(){
    this.view = !this.view;
    this.data.changeMessage(this.view);
  }

  searchState() {
    this.router.navigate(['home','search']);
  }
  showDataSearch() {
    console.log(this.searchData);
    this.data.searchData(this.searchData.data);
  }

  clearSearch() {
    this.searchData.data = '';
  }

  onStatusChanged(data : any) {

      this.data.searchData(data);
    
  }

  changeImage():  void {
      const dialogRef = this.dialog.open(ChangeImageDialogComponent, {
        width: '80%',
        height: '80%',
        data: this.data,
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        var id = localStorage.getItem('id');
        this.service.updateRequest('profilepicupload', id, {"image": result.image}).subscribe((profilePicUpload: any) => {
          console.log(profilePicUpload);
          this.profilePicData = result.image;
        })
      });
  }


   toggleSideNav (): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    const myDiv = document.querySelector('.sidenav') as HTMLElement;
    const mainBody = document.querySelector('.sideNavContainer') as HTMLElement;
    if (window.innerWidth >= 768) {
      mainBody.classList.toggle('open');
      myDiv.style.zIndex = '2';
    }
    else{
      myDiv.style.zIndex = '5';
    }
  
  };
}
