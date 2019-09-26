var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
var ApiService = /** @class */ (function () {
    function ApiService(_http) {
        this._http = _http;
        this.userServiceUrl = environment.origin + "/api/Users";
        this.projectServiceUrl = environment.origin + "/api/Projects";
        this.taskServiceUrl = environment.origin + "/api/Tasks";
    }
    ApiService.prototype.GetUsers = function () {
        var getUrl = this.userServiceUrl + '/GetUsers';
        return this._http.get(getUrl)
            .pipe(map(function (response) { return response.json(); }))
            .catch(this.handleError);
    };
    ApiService.prototype.AddUser = function (user) {
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var addUrl = this.userServiceUrl + '/AddUser';
        return this._http.post(addUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.UpdateUser = function (user) {
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var updateUrl = this.userServiceUrl + '/UpdateUser';
        return this._http.post(updateUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.DeleteUser = function (user) {
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var updateUrl = this.userServiceUrl + '/DeleteUser';
        return this._http.post(updateUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.GetProjects = function () {
        var getUrl = this.projectServiceUrl + '/GetProjects';
        return this._http.get(getUrl)
            .pipe(map(function (response) { return response.json(); }))
            .catch(this.handleError);
    };
    ApiService.prototype.AddProject = function (project) {
        var body = JSON.stringify(project);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var addUrl = this.projectServiceUrl + '/AddProject';
        return this._http.post(addUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.UpdateProject = function (project) {
        var body = JSON.stringify(project);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var updateUrl = this.projectServiceUrl + '/UpdateProject';
        return this._http.post(updateUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.SuspendProject = function (projectID) {
        var body = JSON.stringify(projectID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var deleteUrl = this.projectServiceUrl + '/SuspendProject';
        return this._http.post(deleteUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.AddTask = function (task) {
        var body = JSON.stringify(task);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var addUrl = this.taskServiceUrl + '/AddTask';
        return this._http.post(addUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.UpdateTask = function (task) {
        var body = JSON.stringify(task);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var updateUrl = this.taskServiceUrl + '/UpdateTask';
        return this._http.post(updateUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.AddParentTask = function (task) {
        var body = JSON.stringify(task);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var addUrl = this.taskServiceUrl + '/AddParentTask';
        return this._http.post(addUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.GetParentTasks = function () {
        var getUrl = this.taskServiceUrl + '/GetParentTasks';
        return this._http.get(getUrl)
            .pipe(map(function (response) { return response.json(); }))
            .catch(this.handleError);
    };
    ApiService.prototype.GetTasks = function (projectID) {
        var getUrl = this.taskServiceUrl + '/GetTasks/' + projectID;
        return this._http.get(getUrl)
            .pipe(map(function (response) { return response.json(); }))
            .catch(this.handleError);
    };
    ApiService.prototype.EndTask = function (task) {
        var body = JSON.stringify(task);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var endUrl = this.taskServiceUrl + '/EndTask';
        return this._http.post(endUrl, body, options)
            .catch(this.handleError);
    };
    ApiService.prototype.handleError = function (error) {
        console.error('ApiService:handleError', error);
        return Observable.throw(error);
    };
    ApiService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api-service.js.map