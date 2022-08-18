import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHyperlinkComponent } from './new-hyperlink.component';

describe('NewHyperlinkComponent', () => {
  let component: NewHyperlinkComponent;
  let fixture: ComponentFixture<NewHyperlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHyperlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHyperlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
