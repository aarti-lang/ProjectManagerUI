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
import { TaskModel } from '../models/task-model';
import { ParentTaskModel } from '../models/task-model';
import { ApiService } from '../service/api-service';
import { DialogService } from "ng2-bootstrap-modal";
import { UserListModelComponent } from '../model-popup/user-list-model/user-list-model.component';
import { ProjectListModelComponent } from '../model-popup/project-list-model/project-list-model.component';
import { TaskListModelComponent } from '../model-popup/task-list-model/task-list-model.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
var AddTasksComponent = /** @class */ (function () {
    function AddTasksComponent(apiService, dialogService, route, location) {
        this.apiService = apiService;
        this.dialogService = dialogService;
        this.route = route;
        this.location = location;
        this.startMinDate = new Date().toISOString().split('T')[0];
        var tmpDate = new Date();
        tmpDate.setDate(tmpDate.getDate() + 1);
        this.endMinDate = tmpDate.toISOString().split('T')[0];
        this.taskError = false;
        this.projectError = false;
        this.startEndDateError = false;
        this.userError = false;
        if (route.snapshot.params['task']) {
            var tModel = JSON.parse(route.snapshot.params['task']);
            this.TaskID = tModel.TaskID;
            this.Task = tModel.Task;
            this.ProjectID = tModel.ProjectID;
            this.ParentTaskID = tModel.ParentTaskID;
            this.Project = tModel.Project;
            this.Priority = tModel.Priority;
            this.StartDate = tModel.StartDate.split('T')[0];
            this.EndDate = tModel.EndDate.split('T')[0];
            this.UserID = tModel.UserID;
            this.ParentTask = tModel.ParentTask;
            this.UserName = tModel.UserName;
            this.addButtonText = "Update Task";
        }
        else {
            this.Priority = 0;
            this.StartDate = new Date().toISOString().split('T')[0];
            var tmpDate_1 = new Date();
            tmpDate_1.setDate(tmpDate_1.getDate() + 1);
            this.EndDate = tmpDate_1.toISOString().split('T')[0];
            this.addButtonText = "Add Task";
        }
    }
    AddTasksComponent.prototype.ngOnInit = function () {
    };
    AddTasksComponent.prototype.TaskCheckBoxChange = function () {
        if (this.IsParentTask) {
            document.getElementById('projDialogButton').style.display = 'none';
            document.getElementById('parentTaskDialogButton').style.display = 'none';
            document.getElementById('openUserDialogButton').style.display = 'none';
            this.StartDate = undefined;
            this.EndDate = undefined;
            this.ProjectID = undefined;
            this.Priority = 0;
            this.ParentTaskID = undefined;
            this.UserID = undefined;
            this.projectError = false;
            this.startEndDateError = false;
            this.userError = false;
        }
        else {
            document.getElementById('projDialogButton').style.display = 'block';
            document.getElementById('parentTaskDialogButton').style.display = 'block';
            document.getElementById('openUserDialogButton').style.display = 'block';
            this.StartDate = new Date().toISOString().split('T')[0];
            var tmpDate = new Date();
            tmpDate.setDate(tmpDate.getDate() + 1);
            this.EndDate = tmpDate.toISOString().split('T')[0];
        }
    };
    AddTasksComponent.prototype.AddUpdateTask = function () {
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
        if (this.TaskID) {
            this.UpdateTask();
        }
        else {
            this.AddTask();
        }
    };
    AddTasksComponent.prototype.UpdateTask = function () {
        var _this = this;
        var error = false;
        if (!this.Task) {
            this.taskError = true;
            error = true;
        }
        else {
            this.taskError = false;
        }
        if (!this.ProjectID) {
            this.projectError = true;
            error = true;
        }
        else {
            this.projectError = false;
        }
        if (!this.UserID) {
            this.userError = true;
            error = true;
        }
        else {
            this.userError = false;
        }
        if (!this.StartDate || !this.EndDate) {
            this.startEndDateError = true;
            error = true;
        }
        else {
            this.startEndDateError = false;
        }
        if (!error) {
            this.taskModel = new TaskModel();
            this.taskModel.TaskID = this.TaskID;
            this.taskModel.Task = this.Task;
            this.taskModel.ProjectID = this.ProjectID;
            this.taskModel.ParentTaskID = this.ParentTaskID;
            this.taskModel.Project = this.Project;
            this.taskModel.Priority = this.Priority;
            this.taskModel.StartDate = new Date(this.StartDate);
            this.taskModel.EndDate = new Date(this.EndDate);
            this.taskModel.UserID = this.UserID;
            this.apiService.UpdateTask(this.taskModel)
                .subscribe(function (data) {
                _this.ResetTask();
                document.getElementById('userMsg').innerText = "Task updated successfully...";
                document.getElementById('userMsg').style.color = "green";
            }, function (error) {
                console.log(error);
                document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
                document.getElementById('userMsg').style.color = "red";
            });
        }
    };
    AddTasksComponent.prototype.AddTask = function () {
        var _this = this;
        if (this.IsParentTask) {
            this.projectError = false;
            this.startEndDateError = false;
            this.userError = false;
            if (!this.Task) {
                this.taskError = true;
            }
            else {
                this.taskError = false;
            }
            if (!this.taskError) {
                this.parentTaskModel = new ParentTaskModel();
                this.parentTaskModel.ParentTask = this.Task;
                this.apiService.AddParentTask(this.parentTaskModel)
                    .subscribe(function (data) {
                    _this.ResetTask();
                    document.getElementById('userMsg').innerText = "Task updated successfully...";
                    document.getElementById('userMsg').style.color = "green";
                }, function (error) {
                    console.log(error);
                    document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
                    document.getElementById('userMsg').style.color = "red";
                });
            }
        }
        else {
            var error = false;
            if (!this.Task) {
                this.taskError = true;
                error = true;
            }
            else {
                this.taskError = false;
            }
            if (!this.ProjectID) {
                this.projectError = true;
                error = true;
            }
            else {
                this.projectError = false;
            }
            if (!this.UserID) {
                this.userError = true;
                error = true;
            }
            else {
                this.userError = false;
            }
            if (!this.StartDate || !this.EndDate) {
                this.startEndDateError = true;
                error = true;
            }
            else {
                this.startEndDateError = false;
            }
            if (!error) {
                this.taskModel = new TaskModel();
                this.taskModel.Task = this.Task;
                this.taskModel.ProjectID = this.ProjectID;
                this.taskModel.ParentTaskID = this.ParentTaskID;
                this.taskModel.Project = this.Project;
                this.taskModel.Priority = this.Priority;
                this.taskModel.StartDate = new Date(this.StartDate);
                this.taskModel.EndDate = new Date(this.EndDate);
                this.taskModel.UserID = this.UserID;
                this.apiService.AddTask(this.taskModel)
                    .subscribe(function (data) {
                    document.getElementById('userMsg').innerText = "Task added successfully...";
                    document.getElementById('userMsg').style.color = "green";
                }, function (error) {
                    console.log(error);
                    document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
                    document.getElementById('userMsg').style.color = "red";
                });
            }
        }
    };
    AddTasksComponent.prototype.ResetTask = function () {
        this.Priority = 0;
        this.StartDate = new Date().toISOString().split('T')[0];
        var tmpDate = new Date();
        tmpDate.setDate(tmpDate.getDate() + 1);
        this.EndDate = tmpDate.toISOString().split('T')[0];
        this.addButtonText = "Add Task";
        this.TaskID = undefined;
        this.Task = undefined;
        this.ProjectID = undefined;
        this.ParentTaskID = undefined;
        this.Project = undefined;
        this.UserID = undefined;
        this.ParentTask = undefined;
        this.UserName = undefined;
        this.taskError = false;
        this.projectError = false;
        this.startEndDateError = false;
        this.userError = false;
        document.getElementById('userMsg').innerText = "";
        document.getElementById('userMsg').style.color = "none";
    };
    AddTasksComponent.prototype.openProjectDialog = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(ProjectListModelComponent, this.projectList)
            .subscribe(function (selectedProject) {
            if (selectedProject) {
                _this.ProjectID = selectedProject.ProjectID;
                _this.Project = selectedProject.Project;
            }
        });
        setTimeout(function () {
            disposable.unsubscribe();
        }, 10000);
    };
    AddTasksComponent.prototype.openParentTaskDialog = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(TaskListModelComponent, this.parentTaskList)
            .subscribe(function (selectedTask) {
            if (selectedTask) {
                _this.ParentTaskID = selectedTask.ParentTaskID;
                _this.ParentTask = selectedTask.ParentTask;
            }
        });
        setTimeout(function () {
            disposable.unsubscribe();
        }, 10000);
    };
    AddTasksComponent.prototype.openUserDialog = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(UserListModelComponent, this.UserList)
            .subscribe(function (selectedUser) {
            if (selectedUser) {
                _this.UserID = selectedUser.UserID;
                _this.UserName = selectedUser.FirstName + ' ' + selectedUser.LastName;
            }
        });
        setTimeout(function () {
            disposable.unsubscribe();
        }, 10000);
    };
    AddTasksComponent = __decorate([
        Component({
            selector: 'app-add-tasks',
            templateUrl: './add-tasks.component.html',
            styleUrls: ['./add-tasks.component.css']
        }),
        __metadata("design:paramtypes", [ApiService, DialogService, ActivatedRoute, Location])
    ], AddTasksComponent);
    return AddTasksComponent;
}());
export { AddTasksComponent };
//# sourceMappingURL=add-tasks.component.js.map