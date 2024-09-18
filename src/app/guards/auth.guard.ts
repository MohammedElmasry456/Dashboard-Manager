import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject (Router);
  if(_AuthService.currentUser.getValue() == null)
  {
    _Router.navigate(['/login']);
    return false;
  }else{
    return true;
  }

};
