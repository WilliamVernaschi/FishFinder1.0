import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConnectSensorModalComponent } from './connect-sensor-modal.component';

describe('ConnectSensorModalComponent', () => {
  let component: ConnectSensorModalComponent;
  let fixture: ComponentFixture<ConnectSensorModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConnectSensorModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectSensorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
