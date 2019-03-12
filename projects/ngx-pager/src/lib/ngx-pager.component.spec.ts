import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPagerComponent } from './ngx-pager.component';

describe('NgxPagerComponent', () => {
  let component: NgxPagerComponent;
  let fixture: ComponentFixture<NgxPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
