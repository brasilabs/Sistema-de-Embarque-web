import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarqueDetailComponent } from './embarque-detail.component';

describe('EmbarqueDetailComponent', () => {
  let component: EmbarqueDetailComponent;
  let fixture: ComponentFixture<EmbarqueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbarqueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
