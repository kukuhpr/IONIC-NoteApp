import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagsModalPage } from './tags-modal.page';

describe('TagsModalPage', () => {
  let component: TagsModalPage;
  let fixture: ComponentFixture<TagsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
