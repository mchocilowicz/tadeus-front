import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {TransactionListElem, TransactionService} from "../../services/transaction.service";

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

    displayedColumns: string[] = [
        'ngoID',
        'userID',
        'transactionID',
        'terminalID',
        'tradingPointID',
        'createdAt'
    ];
    dataSource: MatTableDataSource<TransactionListElem> = new MatTableDataSource<TransactionListElem>([])

    constructor(private router: Router, private service: TransactionService) {
    }

    ngOnInit() {
        this.service.getTransactions().subscribe(r => {
            if (r.data) {
                this.dataSource.data = r.data
            }
        })
    }

    onRowClick(elem: TransactionListElem) {
        this.router.navigateByUrl('transaction/' + elem.transactionID)
    }

}
