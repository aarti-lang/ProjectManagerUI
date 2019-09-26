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
import { ProjectModel } from '../models/project-model';
import { ApiService } from '../service/api-service';
import { DialogService } from "ng2-bootstrap-modal";
import { UserListModelComponent } from '../model-popup/user-list-model/user-list-model.component';
var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent(apiService, dialogService) {
        this.apiService = apiService;
        this.dialogService = dialogService;
        this.projectNameError = false;
        this.StartEndDateError = false;
        this.managerError = false;
        this.StartEndDateSelected = false;
        this.Priority = 0;
        this.startMinDate = new Date().toISOString().split('T')[0];
        var tmpDate = new Date();
        tmpDate.setDate(tmpDate.getDate() + 1);
        this.endMinDate = tmpDate.toISOString().split('T')[0];
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.AddButtonText = "Add Project";
        this.ResetButtonText = "Reset";
        this.GetProjects();
    };
    ProjectsComponent.prototype.GetProjects = function () {
        var _this = this;
        this.apiService.GetProjects()
            .subscribe(function (data) {
            _this.projectList = data;
            _this.assignCopy();
        }, function (error) {
            console.log(error);
        });
    };
    ProjectsComponent.prototype.AddUpdateProject = function () {
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
        if (this.ProjectID) {
            this.UpdateProject();
        }
        else {
            this.AddProject();
        }
    };
    ProjectsComponent.prototype.AddProject = function () {
        var _this = this;
        var error = false;
        if (!this.Project) {
            this.projectNameError = true;
            error = true;
        }
        else {
            this.projectNameError = false;
        }
        if (this.StartEndDateSelected && (!this.StartDate || !this.EndDate)) {
            this.StartEndDateError = true;
            error = true;
        }
        else {
            this.StartEndDateError = false;
        }
        if (!this.ManagerID) {
            this.managerError = true;
            error = true;
        }
        else {
            this.managerError = false;
        }
        if (!error) {
            this.object = new ProjectModel();
            this.object.Project = this.Project;
            this.object.Priority = this.Priority;
            if (this.StartEndDateSelected) {
                this.object.StartDate = new Date(this.StartDate);
                this.object.EndDate = new Date(this.EndDate);
            }
            this.object.ManagerID = this.ManagerID;
            this.apiService.AddProject(this.object)
                .subscribe(function (data) {
                _this.ResetData();
                _this.GetProjects();
                document.getElementById('userMsg').innerText = "Project added successfully...";
                document.getElementById('userMsg').style.color = "green";
            }, function (error) {
                console.log(error);
                document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
                document.getElementById('userMsg').style.color = "red";
            });
        }
    };
    ProjectsComponent.prototype.UpdateProject = function () {
        var _this = this;
        var error = false;
        if (!this.Project) {
            this.projectNameError = true;
            error = true;
        }
        else {
            this.projectNameError = false;
        }
        if (this.StartEndDateSelected && (!this.StartDate || !this.EndDate)) {
            this.StartEndDateError = true;
            error = true;
        }
        else {
            this.StartEndDateError = false;
        }
        if (!this.ManagerID) {
            this.managerError = true;
            error = true;
        }
        else {
            this.managerError = false;
        }
        if (!error) {
            this.object = new ProjectModel();
            this.object.Project = this.Project;
            this.object.Priority = this.Priority;
            this.object.ProjectID = this.ProjectID;
            if (this.StartEndDateSelected) {
                this.object.StartDate = new Date(this.StartDate);
                this.object.EndDate = new Date(this.EndDate);
            }
            this.object.ManagerID = this.ManagerID;
            this.apiService.UpdateProject(this.object)
                .subscribe(function (data) {
                _this.ResetData();
                _this.GetProjects();
                document.getElementById('userMsg').innerText = "Project updated successfully...";
                document.getElementById('userMsg').style.color = "green";
            }, function (error) {
                console.log(error);
                document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
                document.getElementById('userMsg').style.color = "red";
            });
        }
    };
    ProjectsComponent.prototype.SuspendProject = function (projectID) {
        var _this = this;
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
        this.apiService.SuspendProject(projectID)
            .subscribe(function (data) {
            _this.ResetData();
            _this.GetProjects();
            document.getElementById('userMsg').innerText = "Project suspended successfully...";
            document.getElementById('userMsg').style.color = "green";
        }, function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
        });
    };
    ProjectsComponent.prototype.EditProject = function (project) {
        this.AddButtonText = "Update";
        this.ResetButtonText = "Cancel";
        this.ProjectID = project.ProjectID;
        this.Project = project.Project;
        this.Priority = project.Priority;
        if (project.StartDate) {
            this.StartDate = project.StartDate.split('T')[0];
            this.EndDate = project.EndDate.split('T')[0];
            this.StartEndDateSelected = true;
        }
        else {
            this.StartEndDateSelected = false;
            this.StartDate = undefined;
            this.EndDate = undefined;
        }
        this.ManagerID = project.ManagerID;
        this.ManagerName = project.ManagerName;
    };
    ProjectsComponent.prototype.filterItem = function () {
        var _this = this;
        if (!this.searchText)
            this.assignCopy();
        this.filteredList = Object.assign([], this.projectList).filter(function (item) { return (item.Project != undefined ? item.Project.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true); });
    };
    ProjectsComponent.prototype.sortingProject = function (sort) {
        if (sort == 'SDate') {
            this.filteredList.sort(function (a, b) {
                if (a.StartDate < b.StartDate)
                    return -1;
                else if (a.StartDate > b.StartDate)
                    return 1;
                else
                    return 0;
            });
        }
        else if (sort == 'EDate') {
            this.filteredList.sort(function (a, b) {
                if (a.EndDate < b.EndDate)
                    return -1;
                else if (a.EndDate > b.EndDate)
                    return 1;
                else
                    return 0;
            });
        }
        else if (sort == 'Priority') {
            this.filteredList.sort(function (a, b) {
                if (a.Priority < b.Priority)
                    return -1;
                else if (a.Priority > b.Priority)
                    return 1;
                else
                    return 0;
            });
        }
        else if (sort == 'Completed') {
            this.filteredList.sort(function (a, b) {
                if (a.NoofCompletedTasks < b.NoofCompletedTasks)
                    return -1;
                else if (a.NoofCompletedTasks > b.NoofCompletedTasks)
                    return 1;
                else
                    return 0;
            });
        }
    };
    ProjectsComponent.prototype.openDialog = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(UserListModelComponent, this.UserList)
            .subscribe(function (selectedUser) {
            if (selectedUser) {
                _this.ManagerID = selectedUser.UserID;
                _this.ManagerName = selectedUser.FirstName + ' ' + selectedUser.LastName;
            }
        });
        setTimeout(function () {
            disposable.unsubscribe();
        }, 10000);
    };
    ProjectsComponent.prototype.assignCopy = function () {
        this.filteredList = Object.assign([], this.projectList);
        this.projListCount = this.filteredList.length;
    };
    ProjectsComponent.prototype.ResetData = function () {
        this.object = new ProjectModel();
        this.Project = undefined;
        this.Priority = 0;
        this.StartEndDateSelected = false;
        this.StartDate = undefined;
        this.EndDate = undefined;
        this.ManagerID = undefined;
        this.ManagerName = undefined;
        this.projectNameError = false;
        this.StartEndDateError = false;
        this.managerError = false;
        this.AddButtonText = "Add Project";
        this.ResetButtonText = "Reset";
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
    };
    ProjectsComponent.prototype.DateCheckBoxChange = function () {
        if (this.StartEndDateSelected) {
            this.StartDate = new Date().toISOString().split('T')[0];
            var tmpDate = new Date();
            tmpDate.setDate(tmpDate.getDate() + 1);
            this.EndDate = tmpDate.toISOString().split('T')[0];
            this.StartEndDateError = false;
        }
        else {
            this.StartDate = undefined;
            this.EndDate = undefined;
            this.StartEndDateError = false;
        }
    };
    ProjectsComponent = __decorate([
        Component({
            selector: 'app-projects',
            templateUrl: './projects.component.html',
            styleUrls: ['./projects.component.css']
        }),
        __metadata("design:paramtypes", [ApiService, DialogService])
    ], ProjectsComponent);
    return ProjectsComponent;
}());
export { ProjectsComponent };
//# sourceMappingURL=projects.component.js.map