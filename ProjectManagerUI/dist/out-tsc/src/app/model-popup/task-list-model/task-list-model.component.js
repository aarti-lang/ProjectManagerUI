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
import { ParentTaskModel } from '../../models/task-model';
import { ApiService } from '../../service/api-service';
var TaskListModelComponent = /** @class */ (function (_super) {
    __extends(TaskListModelComponent, _super);
    function TaskListModelComponent(dialogService, apiService) {
        var _this = _super.call(this, dialogService) || this;
        _this.apiService = apiService;
        return _this;
    }
    TaskListModelComponent.prototype.ngOnInit = function () {
        this.GetParentTasks();
        this.assignCopy();
    };
    TaskListModelComponent.prototype.GetParentTasks = function () {
        var _this = this;
        this.apiService.GetParentTasks()
            .subscribe(function (data) {
            console.log(data);
            _this.parentTaskList = data;
            _this.assignCopy();
        }, function (error) {
            console.log(error);
        });
    };
    TaskListModelComponent.prototype.SelectTask = function (task) {
        var taskModel = new ParentTaskModel();
        taskModel.ParentTaskID = task.ParentTaskID;
        taskModel.ParentTask = task.ParentTask;
        this.result = taskModel;
        this.close();
    };
    TaskListModelComponent.prototype.filterItem = function () {
        var _this = this;
        if (!this.searchText)
            this.assignCopy();
        this.filteredList = Object.assign([], this.parentTaskList).filter(function (item) { return (item.ParentTask != undefined ? item.ParentTask.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true); });
    };
    TaskListModelComponent.prototype.assignCopy = function () {
        this.filteredList = Object.assign([], this.parentTaskList);
        this.parentTaskListCount = this.filteredList.length;
    };
    TaskListModelComponent = __decorate([
        Component({
            selector: 'app-task-list-model',
            templateUrl: './task-list-model.component.html',
            styleUrls: ['./task-list-model.component.css']
        }),
        __metadata("design:paramtypes", [DialogService, ApiService])
    ], TaskListModelComponent);
    return TaskListModelComponent;
}(DialogComponent));
export { TaskListModelComponent };
//# sourceMappingURL=task-list-model.component.js.map