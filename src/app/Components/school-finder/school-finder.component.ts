import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SchoolFinderInfo, SplashService} from '../splash/Service/splash.service';
import {Router} from '@angular/router';

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
  @Output() update: EventEmitter<number> = new EventEmitter<number>();
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
              private splashService: SplashService,
              private router: Router) { }

  clear() {
    this.searchText = '';
    delete this.school;
    const $event = {
      target: {
        textContent: ''
      }
    };
    this.change($event, this.school);
  }

  updateText() {
    this.update.emit(this.school);
  }

  onChange(id) {
    const ret = this.router.navigate(['/register', id]);
  }

  change($event, id: number) {
    this.onChange(id);
    this.updateDOM({id, name: $event.target.textContent} );
  }

  updateDOM(info: SchoolFinderInfo) {
    console.log('updating DOM');
    if (info === undefined) {
      return;
    }
    this.school = info.id;
    this.searchText = info.name;
    this.updateText();
    this.clickOutsideResults();
  }

  focus() {
    this.typing = true;
    this.focused = true;
  }

  blur() {
    this.typing = false;
  }

  clickOutsideResults() {
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
    if (this.school !== undefined) {
      setTimeout(() => {
        console.log('Searching results for school with id: ' + this.school);
        console.log('Found ' + $(this.results.nativeElement).find('.result[data-id=' + this.school + ']').length + ' element(s)');
        const name = $(this.results.nativeElement).find('.result[data-id=' + this.school + ']').text();
        const $event = {
          target: {
            textContent: name
          }
        };
        this.change($event, this.school);
      });
    }
  }
}
