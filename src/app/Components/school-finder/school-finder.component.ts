import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SchoolFinderInfo, SplashService} from '../splash/Service/splash.service';

@Component({
  selector: 'school-finder',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SchoolFinderComponent),
      multi: true
    }
  ],
  templateUrl: './school-finder.component.html',
  styleUrls: ['./school-finder.component.scss']
})
export class SchoolFinderComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input') input: ElementRef;
  @ViewChild('results') results: ElementRef;
  @Input() school: number;
  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  searchText = '';
  typing = false;
  focused = false;
  schools = [
    {
      id: 1,
      name: 'University at Buffalo (SUNY)',
      color: '#0051FF'
    },
    {
      id: 2,
      name: 'Unknown',
      color: '#000000'
    }
  ];
  constructor(private renderer: Renderer2,
              private splashService: SplashService) { }

  updateText() {
    this.update.emit(this.searchText);
  }
  onChange(id) { }

  change($event, id: number) {
    this.onChange(id);
    console.log('Changing ID: ' + id);
    this.splashService.setSchool({id, name: $event.target.textContent} );
  }

  updateDOM(info: SchoolFinderInfo) {
    console.log('update DOM');
    if (info === undefined) { return; }
    this.school = info.id;
    this.searchText = info.name;
    this.renderer.setProperty(this.input.nativeElement, 'value', name);
    this.updateText();
    console.log('School selected: ' + name);
  }

  focus() {
    this.typing = true;
    this.focused = true;
  }

  blur() {
    this.typing = false;
  }

  clickOutsideResults($event) {
    if (!this.typing) {
      this.focused = false;
    }
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

  ngOnInit(): void {
    this.splashService.getSchool().subscribe(info => {
      console.log('subbed');
      this.updateDOM(info);
    });
  }
}
