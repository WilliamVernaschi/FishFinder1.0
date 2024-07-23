import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoSensorConnectedComponent } from './no-sensor-connected.component';

describe('NoSensorConnectedComponent', () => {
  let component: NoSensorConnectedComponent;
  let fixture: ComponentFixture<NoSensorConnectedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSensorConnectedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoSensorConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
