import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SchoolFinderInfo, SplashService} from '../../Views/splash/Service/splash.service';
import {Router} from '@angular/router';
import {SchoolFinderService} from './Service/school-finder.service';

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
export class SchoolFinderComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @ViewChild('schoolFinder') sf: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('results') results: ElementRef;
  @Input() school: number;

  private _searchText = '';
  get searchText(): string { return this._searchText; }
  set searchText(value: string) {
    this._searchText = value;
    this.filterSchools(value);
  }

  defaultColor: 'white';
  currentColor: any;
  typing = false;
  focused = false;
  schools = [
    {
      id: 1,
      name: 'University at Buffalo (SUNY)',
      color: '#0051FF'
    }
  ];
  filteredSchools: any[] = this.schools;

  constructor(private renderer: Renderer2,
              private splashService: SplashService,
              private router: Router,
              private service: SchoolFinderService) { }

  clear() {
    this._searchText = '';
    delete this.school;
    const $event = {
      target: {
        textContent: ''
      }
    };
    this.change($event, this.school);
  }

  updateSchoolInfo() {
    this.service.setSchoolInfo({ id: this.school, name: this.searchText });
  }

  onChange(id) {
    this.router.navigate(['/register', id]).catch((err) => console.log(err));
  }

  change($event, id: number) {
    console.log('changing');
    this.onChange(id);
    this.updateDOM({id, name: $event.target.textContent} );
  }

  updateDOM(info: SchoolFinderInfo) {
    if (info === undefined) {
      return;
    }
    console.log(JSON.stringify(info));
    this.school = info.id;
    this.searchText = info.name;
    this.updateSchoolInfo();
    this.clickOutsideResults();
  }

  focus() {
    this.service.setUsing(this.typing = true);
    this.focused = true;
    this.service.setExpanded(false);
  }

  blur() {
    if (this.school) {
      this.currentColor = this.schools.find(x => x.id === this.school).color;
    }
    this.typing = false;
  }

  clickOutsideResults() {
    if (!this.typing) {
      this.service.setUsing(this.focused = false);
      if (this.school) {
        this.service.setExpanded(true);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registered on touch');
  }

  setDisabledState(isDisabled: boolean): void {
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](this.input.nativeElement, 'locked');
  }

  writeValue(obj: any): void {
    console.log('writing value: ' + obj);
  }

  isNumber(num: number) {
    return !isNaN(num);
  }

  filterSchools(value: string) {
    this.filteredSchools = this.schools.filter(school => {
      return school.name.indexOf(value) !== -1;
    });
  }

  ngAfterViewInit(): void {
    if (this.school !== undefined && this.isNumber(this.school)) {
      console.log('Searching results for school with id: ' + this.school);
      console.log('Found ' + $(this.results.nativeElement).find('.result[data-id=' + this.school + ']').length + ' element(s)');
      const name = $(this.results.nativeElement).find('.result[data-id=' + this.school + ']').text();
      const $event = {
        target: {
          textContent: name
        }
      };
      let sch = this.schools.find(x => x.id == this.school);
      if (sch) {
        let $school = this.school;
        setTimeout(() => {
          this.change($event, $school);
          this.currentColor = sch.color;
        });
        console.log('Name: ' + name);
      }
    }
    console.log(this.typing);
    console.log(this.focused);
    console.log(this.isNumber(this.school));
    console.log(this.searchText);
  }

  ngOnInit(): void {

  }
}
