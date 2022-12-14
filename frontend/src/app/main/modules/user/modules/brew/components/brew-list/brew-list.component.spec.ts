import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewListComponent } from './brew-list.component';

describe('BrewListComponent', () => {
  let component: BrewListComponent;
  let fixture: ComponentFixture<BrewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
