var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { appRoutes } from './app-routing.module';
import { ApiService } from './service/api-service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { UserListModelComponent } from './model-popup/user-list-model/user-list-model.component';
import { ProjectListModelComponent } from './model-popup/project-list-model/project-list-model.component';
import { TaskListModelComponent } from './model-popup/task-list-model/task-list-model.component';
import { DialogService } from "ng2-bootstrap-modal";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                ProjectsComponent,
                UsersComponent,
                AddTasksComponent,
                ViewTasksComponent,
                UserListModelComponent,
                ProjectListModelComponent,
                TaskListModelComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                RouterModule.forRoot(appRoutes),
                BootstrapModalModule.forRoot({ container: document.body })
            ],
            entryComponents: [
                UserListModelComponent,
                ProjectListModelComponent,
                TaskListModelComponent
            ],
            providers: [ApiService, DialogService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map