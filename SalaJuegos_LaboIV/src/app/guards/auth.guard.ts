import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = loginService.IsLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false; // 👈 asegurate de frenar la navegación
  }

  return true;
};
