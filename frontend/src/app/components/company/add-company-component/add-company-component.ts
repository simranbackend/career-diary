import { Component } from '@angular/core';
import { HeaderComponent } from '../../header-component/header-component';
import { LeftSidebar } from '../../left-sidebar/left-sidebar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-company-component',
  imports: [HeaderComponent, LeftSidebar, RouterLink],
  templateUrl: './add-company-component.html',
  styleUrl: './add-company-component.css'
})
export class AddCompanyComponent {

}
