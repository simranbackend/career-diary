import { Component } from '@angular/core';
import { HeaderComponent } from '../header-component/header-component';
import { LeftSidebar } from '../left-sidebar/left-sidebar';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [HeaderComponent, LeftSidebar],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent {

}
