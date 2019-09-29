import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  opened: boolean | null = false;
  selected = '';

  constructor(private readonly service: TranslateService) {
  }

  ngOnInit() {
    this.selected = this.service.currentLang;
  }

  onLanguageChange() {
    this.service.use(this.selected);
  }

}
