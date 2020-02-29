import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoSettlementComponent } from './ngo-settlement.component';

describe('NgoSettlementComponent', () => {
    let component: NgoSettlementComponent;
    let fixture: ComponentFixture<NgoSettlementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgoSettlementComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgoSettlementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
