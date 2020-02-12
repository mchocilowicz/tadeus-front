import { Component } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    links = [
        'login',
        'user',
        'city',
        'stats',
        'configuration',
        'ngo',
        'ngo-type',
        'trading-point-type',
        'trading-point'
    ];

}
