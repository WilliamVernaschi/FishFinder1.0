import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConnectSensorModalItemComponent } from './connect-sensor-modal-item.component';

describe('ConnectSensorModalItemComponent', () => {
  let component: ConnectSensorModalItemComponent;
  let fixture: ComponentFixture<ConnectSensorModalItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConnectSensorModalItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectSensorModalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
