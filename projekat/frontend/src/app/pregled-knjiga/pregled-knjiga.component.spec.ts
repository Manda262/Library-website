import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledKnjigaComponent } from './pregled-knjiga.component';

describe('PregledKnjigaComponent', () => {
  let component: PregledKnjigaComponent;
  let fixture: ComponentFixture<PregledKnjigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledKnjigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledKnjigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
