import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DomSanitizerMock } from 'src/mocks/dom-sanitizer.mock';
import { MatIconRegistryMock } from 'src/mocks/mat-icon-registry.mock';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: DomSanitizer, useClass: DomSanitizerMock },
        { provide: MatIconRegistry, useClass: MatIconRegistryMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return the path of the router outlet', () => {
    // Arrange
    const path = 'fancy-path';
    const outlet: any = { activatedRouteData: { path } };

    // Act
    const state = component.getState(outlet);

    // Assert
    expect(state).toBe(path);
  });
});
