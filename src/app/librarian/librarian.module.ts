import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { LibrarianRoutingModule } from './librarian-routing.module';
import { LibrarianComponent } from './librarian.component';
import { BranchesComponent } from './branches/branches.component';
import { BookCopiesComponent } from './book-copies/book-copies.component';
import { LibraryBranchesService } from './services/library-branches.service';
import { UpdateLibraryBranchComponent } from './update-library-branch/update-library-branch.component';

@NgModule({
  declarations: [
    LibrarianComponent,
    BranchesComponent,
    BookCopiesComponent,
    UpdateLibraryBranchComponent,
  ],
  imports: [
    CommonModule,
    LibrarianRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    LibraryBranchesService,
    { provide: 'domain', useValue: 'http://localhost:8080' },
  ],
})
export class LibrarianModule {}
