import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailersComponent } from './mailers.component';

describe('MailersComponent', () => {
  let component: MailersComponent;
  let fixture: ComponentFixture<MailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
