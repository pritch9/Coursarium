import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'fancy-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FancyInputComponent),
      multi: true
    }
  ],
  templateUrl: './fancy-input.component.html',
  styleUrls: ['./fancy-input.component.scss']
})
export class FancyInputComponent implements ControlValueAccessor {

  @ViewChild('input') input: ElementRef;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Output() update = new EventEmitter<string>();
  text = '';
  typing = false;
  onChange: any;

  constructor(private renderer: Renderer2) { }

  updateText() {
    this.update.emit(this.text);
  }

  change($event) {
    this.onChange($event.target.textContent);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](this.input.nativeElement, 'locked');
  }

  writeValue(obj: any): void {
  }

}
