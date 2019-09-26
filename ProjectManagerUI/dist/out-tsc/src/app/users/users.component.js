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
import { UserModel } from '../models/user-model';
import { ApiService } from '../service/api-service';
var UsersComponent = /** @class */ (function () {
    function UsersComponent(apiService) {
        this.apiService = apiService;
        this.firstNameError = false;
        this.lastNameError = false;
        this.employeeIDError = false;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.AddButtonText = "Add User";
        this.ResetButtonText = "Reset";
        this.GetUsers();
    };
    UsersComponent.prototype.sortingUser = function (sort) {
        if (sort == 'FName') {
            this.filteredList.sort(function (a, b) {
                if (a.FirstName < b.FirstName)
                    return -1;
                else if (a.FirstName > b.FirstName)
                    return 1;
                else
                    return 0;
            });
        }
        else if (sort == 'LName') {
            this.filteredList.sort(function (a, b) {
                if (a.LastName < b.LastName)
                    return -1;
                else if (a.LastName > b.LastName)
                    return 1;
                else
                    return 0;
            });
        }
        else if (sort == 'EId') {
            this.filteredList.sort(function (a, b) {
                if (a.EmployeeID < b.EmployeeID)
                    return -1;
                else if (a.EmployeeID > b.EmployeeID)
                    return 1;
                else
                    return 0;
            });
        }
    };
    UsersComponent.prototype.numberOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    UsersComponent.prototype.assignCopy = function () {
        this.filteredList = Object.assign([], this.UserList);
        this.userListCount = this.filteredList.length;
    };
    UsersComponent.prototype.filterItem = function () {
        var _this = this;
        if (!this.searchText)
            this.assignCopy();
        this.filteredList = Object.assign([], this.UserList).filter(function (item) { return (item.FirstName != undefined ? item.FirstName.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true) ||
            (item.LastName != undefined ? item.LastName.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true) ||
            (item.EmployeeID != undefined ? item.EmployeeID.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true); });
    };
    UsersComponent.prototype.GetUsers = function () {
        var _this = this;
        this.apiService.GetUsers()
            .subscribe(function (data) {
            _this.UserList = data;
            _this.assignCopy();
        }, function (error) {
            console.log(error);
        });
    };
    UsersComponent.prototype.AddUpdateUser = function () {
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
        if (this.UserID) {
            this.UpdateUser();
        }
        else {
            this.AddUser();
        }
    };
    UsersComponent.prototype.AddUser = function () {
        var _this = this;
        if (!this.FirstName) {
            this.firstNameError = true;
        }
        else {
            this.firstNameError = false;
        }
        if (!this.LastName) {
            this.lastNameError = true;
        }
        else {
            this.lastNameError = false;
        }
        if (!this.EmployeeID) {
            this.employeeIDError = true;
        }
        else {
            this.employeeIDError = false;
        }
        if (!this.firstNameError && !this.lastNameError && !this.employeeIDError) {
            this.object = new UserModel();
            this.object.FirstName = this.FirstName;
            this.object.LastName = this.LastName;
            this.object.EmployeeID = this.EmployeeID;
            this.apiService.AddUser(this.object)
                .subscribe(function (data) {
                _this.ResetData();
                _this.GetUsers();
                document.getElementById('userMsg').innerText = "User added successfully...";
                document.getElementById('userMsg').style.color = "green";
            }, function (error) {
                console.log(error);
                document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
                document.getElementById('userMsg').style.color = "red";
            });
        }
    };
    UsersComponent.prototype.UpdateUser = function () {
        var _this = this;
        if (!this.FirstName) {
            this.firstNameError = true;
        }
        else {
            this.firstNameError = false;
        }
        if (!this.LastName) {
            this.lastNameError = true;
        }
        else {
            this.lastNameError = false;
        }
        if (!this.EmployeeID) {
            this.employeeIDError = true;
        }
        else {
            this.employeeIDError = false;
        }
        if (!this.firstNameError && !this.lastNameError && !this.employeeIDError) {
            this.object = new UserModel();
            this.object.UserID = this.UserID;
            this.object.FirstName = this.FirstName;
            this.object.LastName = this.LastName;
            this.object.EmployeeID = this.EmployeeID;
            this.apiService.UpdateUser(this.object)
                .subscribe(function (data) {
                _this.ResetData();
                _this.GetUsers();
                document.getElementById('userMsg').innerText = "User updated successfully...";
                document.getElementById('userMsg').style.color = "green";
            }, function (error) {
                console.log(error);
                document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
                document.getElementById('userMsg').style.color = "red";
            });
        }
    };
    UsersComponent.prototype.DeleteUser = function (user) {
        var _this = this;
        var obj = new UserModel();
        obj.UserID = user.UserID;
        obj.FirstName = user.FirstName;
        obj.LastName = user.LastName;
        obj.EmployeeID = user.EmployeeID;
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
        this.apiService.DeleteUser(obj)
            .subscribe(function (data) {
            _this.ResetData();
            _this.GetUsers();
            document.getElementById('userMsg').innerText = "User deleted successfully...";
            document.getElementById('userMsg').style.color = "green";
        }, function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
        });
    };
    UsersComponent.prototype.EditUser = function (user) {
        this.AddButtonText = "Update";
        this.ResetButtonText = "Cancel";
        this.FirstName = user.FirstName;
        this.LastName = user.LastName;
        this.EmployeeID = user.EmployeeID;
        this.UserID = user.UserID;
    };
    UsersComponent.prototype.ResetData = function () {
        this.object = new UserModel();
        this.FirstName = undefined;
        this.LastName = undefined;
        this.EmployeeID = undefined;
        this.UserID = undefined;
        this.firstNameError = false;
        this.lastNameError = false;
        this.employeeIDError = false;
        this.AddButtonText = "Add User";
        this.ResetButtonText = "Reset";
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
    };
    UsersComponent = __decorate([
        Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css']
        }),
        __metadata("design:paramtypes", [ApiService])
    ], UsersComponent);
    return UsersComponent;
}());
export { UsersComponent };
//# sourceMappingURL=users.component.js.map