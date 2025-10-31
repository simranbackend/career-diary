import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css'
})
export class LeftSidebar {
  constructor(
    private router: Router, 
    private toastr: ToastrService, 
    private userService: UserService
  ) {}

  logout(): void {
    const token = localStorage.getItem('token');

    try {
      if (token && this.userService && typeof this.userService.logout === 'function') {
        this.userService.logout().subscribe({
          next: () => this.clearAndNavigate(),
          error: (err) => {
            console.error('Logout API error', err);
            this.clearAndNavigate();
          },
        });
      } else {
        // If no token or userService missing, just clear client and navigate
        this.clearAndNavigate();
      }
    } catch (err) {
      console.error('Logout handler error', err);
      this.clearAndNavigate();
    }
  }

  private clearAndNavigate(): void {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) {
      // ignore
    }
    this.toastr.info('You have been logged out.', 'Logged out');
    this.router.navigate(['/login']);
  }

}
