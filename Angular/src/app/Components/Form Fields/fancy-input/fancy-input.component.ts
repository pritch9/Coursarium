import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
  @Input() match: string;
  @Input() submitted: boolean;
  @Input() error = {
    control: null,
    message: ''
  };
  @Output() updated = new EventEmitter();
  text = '';
  typing = false;
  onChange: any;

  constructor(private renderer: Renderer2) { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  update() {
    this.onChange(this.text);
    this.updated.emit();
  }

  focusIn() {
    this.typing = true;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](this.input.nativeElement, 'locked');
  }

  writeValue(obj: any): void {
    $(this.input.nativeElement).val(obj);
  }

}
