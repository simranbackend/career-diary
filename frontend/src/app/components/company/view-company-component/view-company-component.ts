import { Component } from '@angular/core';
import { HeaderComponent } from '../../header-component/header-component';
import { LeftSidebar } from '../../left-sidebar/left-sidebar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-view-company-component',
  imports: [HeaderComponent, LeftSidebar, RouterLink],
  templateUrl: './view-company-component.html',
  styleUrl: './view-company-component.css'
})
export class ViewCompanyComponent {

}
