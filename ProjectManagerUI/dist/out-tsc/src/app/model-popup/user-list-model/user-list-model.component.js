var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { UserModel } from '../../models/user-model';
import { ApiService } from '../../service/api-service';
var UserListModelComponent = /** @class */ (function (_super) {
    __extends(UserListModelComponent, _super);
    function UserListModelComponent(dialogService, apiService) {
        var _this = _super.call(this, dialogService) || this;
        _this.apiService = apiService;
        return _this;
    }
    UserListModelComponent.prototype.ngOnInit = function () {
        this.GetUsers();
        this.assignCopy();
    };
    UserListModelComponent.prototype.GetUsers = function () {
        var _this = this;
        this.apiService.GetUsers()
            .subscribe(function (data) {
            console.log(data);
            _this.UserList = data;
            _this.assignCopy();
        }, function (error) {
            console.log(error);
        });
    };
    UserListModelComponent.prototype.SelectUser = function (user) {
        var userModel = new UserModel();
        userModel.FirstName = user.FirstName;
        userModel.LastName = user.LastName;
        userModel.EmployeeID = user.EmployeeID;
        userModel.UserID = user.UserID;
        this.result = userModel;
        this.close();
    };
    UserListModelComponent.prototype.filterItem = function () {
        var _this = this;
        if (!this.searchText)
            this.assignCopy();
        this.filteredList = Object.assign([], this.UserList).filter(function (item) { return (item.FirstName != undefined ? item.FirstName.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true) ||
            (item.LastName != undefined ? item.LastName.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true) ||
            (item.EmployeeID != undefined ? item.EmployeeID.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true); });
    };
    UserListModelComponent.prototype.assignCopy = function () {
        this.filteredList = Object.assign([], this.UserList);
        this.userListCount = this.filteredList.length;
    };
    UserListModelComponent = __decorate([
        Component({
            selector: 'app-user-list-model',
            templateUrl: './user-list-model.component.html',
            styleUrls: ['./user-list-model.component.css']
        }),
        __metadata("design:paramtypes", [DialogService, ApiService])
    ], UserListModelComponent);
    return UserListModelComponent;
}(DialogComponent));
export { UserListModelComponent };
//# sourceMappingURL=user-list-model.component.js.map