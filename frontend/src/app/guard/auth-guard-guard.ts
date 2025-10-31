import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * authGuardGuard
 * - Protects routes that require authentication (dashboard)
 * - Prevents access to login/otp when already authenticated (redirects to dashboard)
 */
export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const url = state.url || '';

  if (url.startsWith('/login') || url.startsWith('/otp')) {
    if (token) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  if (token) {
    return true;
  }

  // Not authenticated -> redirect to login with returnUrl
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
