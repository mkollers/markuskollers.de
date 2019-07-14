import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DomSanitizerMock } from 'src/mocks/dom-sanitizer.mock';
import { MatIconRegistryMock } from 'src/mocks/mat-icon-registry.mock';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
