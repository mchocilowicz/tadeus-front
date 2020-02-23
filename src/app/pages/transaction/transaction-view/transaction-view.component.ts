import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TransactionService} from "../../../services/transaction.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-transaction-view',
    templateUrl: './transaction-view.component.html',
    styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {

    transactionForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private service: TransactionService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("ID");
        if (id.length > 0) {
            this.service.getTransactionBy(id).subscribe(r => {
                if (r.data) {
                    this.transactionForm = this.fb.group({
                        ngoID: new FormControl({value: r.data.ngoID, disabled: true}),
                        userID: new FormControl({value: r.data.userID, disabled: true}),
                        transactionID: new FormControl({value: r.data.transactionID, disabled: true}),
                        terminalID: new FormControl({value: r.data.terminalID, disabled: true}),
                        tradingPointID: new FormControl({value: r.data.tradingPointID, disabled: true}),
                        userXp: new FormControl({value: r.data.userXp, disabled: true}),
                        isPaid: new FormControl({value: r.data.isPaid, disabled: true}),
                        ngoDonation: new FormControl({value: r.data.ngoDonation, disabled: true}),
                        price: new FormControl({value: r.data.price, disabled: true}),
                        donationPercentage: new FormControl({value: r.data.donationPercentage, disabled: true}),
                        provisionPercentage: new FormControl({value: r.data.provisionPercentage, disabled: true}),
                        paymentValue: new FormControl({value: r.data.paymentValue, disabled: true}),
                        vat: new FormControl({value: r.data.vat, disabled: true}),
                        provision: new FormControl({value: r.data.provision, disabled: true}),
                        donationPool: new FormControl({value: r.data.donationPool, disabled: true}),
                        personalPool: new FormControl({value: r.data.personalPool, disabled: true}),
                        tradingPointXp: new FormControl({value: r.data.tradingPointXp, disabled: true}),
                        createdAt: new FormControl({value: r.data.createdAt, disabled: true}),
                    })
                } else {
                    this.router.navigateByUrl('transaction')
                }
            })
        } else {
            this.router.navigateByUrl('transaction')
        }
    }

}
