
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allUser: Object;
  categories: Object;

  isEdit = false;
  userObj = {
    name: '',
    mobile: '',
    email: '',
    category: '',
    id: ''
  }
  categoryObj = {
    name: '',
    description: '',
    shape: '',
  }
  users: any[];
  categoryDesc: string;
  categoryName: string;
  categoryCount: number;
  categoryImg: string;
  shapeName: string;
  shapeCount: number;
  categoryShape = {
    name: '',
    count: 0
  };
  categoryShapes: any[] = [];

  manager: number;
  developer: number;
  devops: number;


  constructor(private userService: UserService) {
    this.userService.getAllUser().subscribe((users: any) =>
      this.users = this.allUser = users);
  }
  ngOnInit() {
    this.getLatestUser();
    this.getCategories();

  }

  addUser(formObj) {
    console.log(formObj)
    this.userService.createUser(formObj).subscribe((response) => {
      this.getLatestUser();
    })
  }
  getLatestUser() {
    this.userService.getAllUser().subscribe((response) => {
      this.allUser = response;
      this.calculateCount();
    })

   
  }
  calculateCount(){
    this.devops=0;
    this.developer=0;
    this.manager=0;
    for(let user of Array.prototype.slice.call(this.allUser)){
      if(user.category.name=='devops'){
        this.devops+=1;
      }else if(user.category.name=='developer'){
        this.developer+=1;
      }else if(user.category.name=='manager'){
        this.manager+=1;
      }
  }
  }

  editUser(user) {
    this.isEdit = true;
    this.userObj = user;

  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(() => {
      this.getLatestUser();
    })
  }
  updateUser() {
    this.isEdit = !this.isEdit;
    this.userObj.category = this.categoryObj.name;
    this.userService.updateUser(this.userObj).subscribe(() => {
      this.getLatestUser();
    })
  }

  getCategories() {
    this.userService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }
  filter(query: string) {
    if (query) {
      this.allUser = this.users.filter(p => p.name && p.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.allUser = this.users;
    }
  }
  onCategorySelected(val: any) {
    this.customFunction(val);
  }
  setNull() {
    this.categoryShape = {
      name: '',
      count: 0
    }
  }
 
  customFunction(category: any) {
    this.categoryName = '';
    this.categoryDesc = '';
    this.categoryCount = 0;
    this.categoryImg = '';
    this.categoryShapes=[];

    this.categoryDesc = category.description;
    this.categoryName = category.name;

    for (var i = 0; i < category.shapes.length; i++) {
      this.setNull();
      this.categoryShape.name = category.shapes[i].name;
      this.categoryShape.count = category.shapes[i].count;
      this.categoryShapes.push(this.categoryShape);
      
    }









  }

}
