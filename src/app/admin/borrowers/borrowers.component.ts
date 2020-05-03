import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Borrower } from '../types';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pager, PagerService } from 'src/app/common/services/pager.service';

@Component({
  selector: 'app-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.css'],
})
export class BorrowersComponent implements OnInit {
  private modalRef: NgbModalRef;
  items: Borrower[] = [];
  selectedItem: Borrower;
  errorMessage: string;
  closeResult: string;
  searchString = '';
  pager: Pager;
  pagedItems: Borrower[];
  itemsPerPage = 5;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private pagerService: PagerService
  ) {}

  open(content, item?: Borrower) {
    this.selectedItem = item
      ? item
      : { id: null, name: '', address: '', phoneNumber: '' };
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errorMessage = '';
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errorMessage = `${reason}`;
        this.closeResult = `Dismissed`;
      }
    );
  }

  setPage(page: number): void {
    this.pager = this.pagerService.getPager(
      this.items.length,
      page,
      this.itemsPerPage
    );

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pagedItems = this.items.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  fetchData(): void {
    this.adminService.getBorrowers().subscribe({
      next: (items) => {
        this.items = items;
        if (this.pager) {
          this.setPage(this.pager.currentPage);
        } else {
          this.setPage(1);
        }
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  submit() {
    if (this.selectedItem.id) {
      this.adminService.editBorrower(this.selectedItem).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.adminService.addBorrower(this.selectedItem).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    }

    this.modalRef.close();
  }

  delete(id: number) {
    this.adminService.deleteBorrower(id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
