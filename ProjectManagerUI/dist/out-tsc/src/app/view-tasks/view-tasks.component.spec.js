import { async, TestBed } from '@angular/core/testing';
import { ApiService } from '../service/api-service';
import { DialogService } from "ng2-bootstrap-modal";
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app-routing.module';
import { ViewTasksComponent } from '../view-tasks/view-tasks.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UsersComponent } from '../users/users.component';
import { ProjectsComponent } from '../projects/projects.component';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { APP_BASE_HREF } from '@angular/common';
describe('ViewTasksComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ViewTasksComponent, UsersComponent, ProjectsComponent, AddTasksComponent],
            imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
            providers: [ApiService, DialogService, { provide: APP_BASE_HREF, useValue: '/' }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ViewTasksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=view-tasks.component.spec.js.map