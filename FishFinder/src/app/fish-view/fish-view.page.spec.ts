import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FishViewPage } from './fish-view.page';

describe('FishViewPage', () => {
  let component: FishViewPage;
  let fixture: ComponentFixture<FishViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FishViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
