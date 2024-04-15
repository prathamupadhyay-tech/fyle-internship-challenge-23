import { Component, ViewChild, ElementRef ,OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  loader = false
  userDataLoader = false
  title = 'fyle-frontend-challenge';
  @ViewChild('dropdownDiv') dropdownDiv!: ElementRef;
  constructor(
    private apiService: ApiService
  ) {}
  data:any= []
  repoData:any=[]
  currentPage:number = 1;
  currentUser:string='';
  pageLimit:number=10
  totalItems:number =0;
  ngOnInit() {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      this.currentPage = +storedPage; 
    } else {
      
      this.currentPage = 1;
    }
    
  } 

  getUserData(userName:string){
    this.currentPage = 1;
    localStorage.setItem('currentPage', this.currentPage.toString());
    this.currentUser = userName;
    console.log(userName)
    this.userDataLoader = true;
    this.apiService.getUser(this.currentUser).subscribe(
     
      (response) => {
        this.data = response;
        console.log(this.data); 
        this.totalItems = this.data.public_repos;
        this.userDataLoader= false;
      },
      (error) => {
        this.currentUser = '';
        console.log(error)
        alert("No user was found");
        console.error('Error fetching repositories:', error);
        this.userDataLoader= false;
        this.loader=false
        return
        // Handle the error here, such as displaying an error message to the user
        // You can also set a flag to indicate an error state and show it in the UI
      }
    );
    this.getRepos()
  }


  getRepos(){
    this.loader = true;

    this.apiService.getRepos(this.currentUser,this.currentPage , this.pageLimit).subscribe(
      (response) => {
        console.log(this.currentPage);
        this.repoData = response;
        console.log(this.repoData);
        this.loader = false;
      },
      (error) => {
        this.currentUser = '';
        console.log(error)
        alert("No user was found");
        console.error('Error fetching repositories:', error);
        // Handle the error here, such as displaying an error message to the user
        // You can also set a flag to indicate an error state and show it in the UI
      }
    )
    
  }
 
  changePageLimit(limit:number){
    this.pageLimit = limit
    this.currentPage = 1;

    this.getRepos()
    localStorage.setItem('currentPage', this.currentPage.toString());
    localStorage.setItem('pageLimit', this.pageLimit.toString());
  }

  toggleDropdown() {
    this.dropdownDiv.nativeElement.classList.toggle('hidden');
  }
  
  decreasePage(num:number):void{
    localStorage.setItem('currentPage', this.currentPage.toString());
    if(this.currentPage >1){
      this.currentPage = this.currentPage-num;
      this.getRepos()
    }
   
  }
  increasePage(num:number):void{
    localStorage.setItem('currentPage', this.currentPage.toString());
    if(this.currentPage <Math.ceil(this.totalItems / this.pageLimit)){
      this.currentPage = this.currentPage+num;
      console.log(this.currentPage)
      this.getRepos()
    }
   
  }
  changePage(page:number):void{
    localStorage.setItem('currentPage', this.currentPage.toString());
    this.currentPage = page;
    console.log(this.currentPage)
    this.getRepos()
  }
}
