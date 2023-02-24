import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPoemaComponent } from './crear-poema.component';

describe('CrearPoemaComponent', () => {
  let component: CrearPoemaComponent;
  let fixture: ComponentFixture<CrearPoemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPoemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPoemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
