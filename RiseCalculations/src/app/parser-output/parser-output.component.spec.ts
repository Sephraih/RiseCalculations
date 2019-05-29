import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserOutputComponent } from './parser-output.component';

describe('ParserOutputComponent', () => {
  let component: ParserOutputComponent;
  let fixture: ComponentFixture<ParserOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
