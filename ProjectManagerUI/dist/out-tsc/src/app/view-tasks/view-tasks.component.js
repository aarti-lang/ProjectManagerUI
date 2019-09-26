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
import { ApiService } from '../service/api-service';
import { ProjectListModelComponent } from '../model-popup/project-list-model/project-list-model.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router } from '@angular/router';
var ViewTasksComponent = /** @class */ (function () {
    function ViewTasksComponent(apiService, dialogService, router) {
        this.apiService = apiService;
        this.dialogService = dialogService;
        this.router = router;
    }
    ViewTasksComponent.prototype.ngOnInit = function () {
    };
    ViewTasksComponent.prototype.EndTask = function (task) {
        var _this = this;
        this.apiService.EndTask(task).subscribe(function (data) {
            _this.GetTasks(_this.ProjectID);
            document.getElementById('userMsg').innerText = "Task ended successfully...";
            document.getElementById('userMsg').style.color = "green";
        }, function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
        });
    };
    ViewTasksComponent.prototype.EditTask = function (task) {
        this.router.navigate(['/addTasks', { task: JSON.stringify(task) }], { skipLocationChange: true });
    };
    ViewTasksComponent.prototype.openProjectDialog = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(ProjectListModelComponent, this.projectList)
            .subscribe(function (selectedProject) {
            if (selectedProject) {
                _this.ProjectID = selectedProject.ProjectID;
                _this.Project = selectedProject.Project;
                _this.GetTasks(_this.ProjectID);
            }
        });
        setTimeout(function () {
            disposable.unsubscribe();
        }, 10000);
    };
    ViewTasksComponent.prototype.sortingTask = function (sort) {
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
                if (a.Status > b.Status)
                    return -1;
                else if (a.Status < b.Status)
                    return 1;
                else
                    return 0;
            });
        }
    };
    ViewTasksComponent.prototype.GetTasks = function (projectID) {
        var _this = this;
        this.apiService.GetTasks(projectID)
            .subscribe(function (data) {
            console.log(data);
            _this.taskList = data;
            _this.assignCopy();
        }, function (error) {
            console.log(error);
        });
    };
    ViewTasksComponent.prototype.assignCopy = function () {
        this.filteredList = Object.assign([], this.taskList);
        this.taskListCount = this.filteredList.length;
    };
    ViewTasksComponent = __decorate([
        Component({
            selector: 'app-view-tasks',
            templateUrl: './view-tasks.component.html',
            styleUrls: ['./view-tasks.component.css']
        }),
        __metadata("design:paramtypes", [ApiService, DialogService, Router])
    ], ViewTasksComponent);
    return ViewTasksComponent;
}());
export { ViewTasksComponent };
//# sourceMappingURL=view-tasks.component.js.map