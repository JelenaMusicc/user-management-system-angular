import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  allUser: Object;
  categories: Object;

  userObj: any = {
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
  user:any = {};
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

  id: number;

  constructor(private userService: UserService, private route: Router, private router: ActivatedRoute) {
    this.userService.getAllUser().subscribe((users: any) =>
      this.users = this.allUser = users);

      this.id =+ this.router.snapshot.paramMap.get('id');
      if (this.id) {
        this.userService.getCurrentUser(this.id).subscribe(u => this.userObj = u);
      }
  }
  ngOnInit() {
    this.getLatestUser();
    this.getCategories();
  }
  addUser(formObj) {
    if(this.id){
      this.updateUser();
    }else{
      this.userService.createUser(formObj).subscribe((response) => {
        this.getLatestUser();
      })
    }
    this.route.navigateByUrl('/');
  }
  getLatestUser() {
      this.userService.getAllUser().subscribe((response) => {
        this.allUser = response;
    })
  }
  
  updateUser() {
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
    this.categoryShapes = [];

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
