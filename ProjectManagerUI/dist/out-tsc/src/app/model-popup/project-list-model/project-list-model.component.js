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
import { ProjectModel } from '../../models/project-model';
import { ApiService } from '../../service/api-service';
var ProjectListModelComponent = /** @class */ (function (_super) {
    __extends(ProjectListModelComponent, _super);
    function ProjectListModelComponent(dialogService, apiService) {
        var _this = _super.call(this, dialogService) || this;
        _this.apiService = apiService;
        return _this;
    }
    ProjectListModelComponent.prototype.ngOnInit = function () {
        this.GetProjects();
        this.assignCopy();
    };
    ProjectListModelComponent.prototype.GetProjects = function () {
        var _this = this;
        this.apiService.GetProjects()
            .subscribe(function (data) {
            console.log(data);
            _this.projectList = data;
            _this.assignCopy();
        }, function (error) {
            console.log(error);
        });
    };
    ProjectListModelComponent.prototype.SelectProject = function (project) {
        var projectModel = new ProjectModel();
        projectModel.ProjectID = project.ProjectID;
        projectModel.Project = project.Project;
        this.result = projectModel;
        this.close();
    };
    ProjectListModelComponent.prototype.filterItem = function () {
        var _this = this;
        if (!this.searchText)
            this.assignCopy();
        this.filteredList = Object.assign([], this.projectList).filter(function (item) { return (item.Project != undefined ? item.Project.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 : true); });
    };
    ProjectListModelComponent.prototype.assignCopy = function () {
        this.filteredList = Object.assign([], this.projectList);
        this.projectListCount = this.filteredList.length;
    };
    ProjectListModelComponent = __decorate([
        Component({
            selector: 'app-project-list-model',
            templateUrl: './project-list-model.component.html',
            styleUrls: ['./project-list-model.component.css']
        }),
        __metadata("design:paramtypes", [DialogService, ApiService])
    ], ProjectListModelComponent);
    return ProjectListModelComponent;
}(DialogComponent));
export { ProjectListModelComponent };
//# sourceMappingURL=project-list-model.component.js.map