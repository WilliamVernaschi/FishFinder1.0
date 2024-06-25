import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDeviceDetectedPage } from './no-device-detected.page';

describe('NoDeviceDetectedPage', () => {
  let component: NoDeviceDetectedPage;
  let fixture: ComponentFixture<NoDeviceDetectedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDeviceDetectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
