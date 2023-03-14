import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigaInfoComponent } from './knjiga-info.component';

describe('KnjigaInfoComponent', () => {
  let component: KnjigaInfoComponent;
  let fixture: ComponentFixture<KnjigaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnjigaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
