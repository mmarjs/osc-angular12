import { Component, Inject } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment';

@Component({
  selector: 'app-password-protection',
  templateUrl: './password-protection.component.html',
  styleUrls: ['./password-protection.component.scss'],
  providers: [{ provide: 'ENVIRONMENT', useValue: environment }],
})
export class PasswordProtectionComponent {
  showContent = !this.env.passwordProtected;
  error = '';

  constructor(@Inject('ENVIRONMENT') public env) {
    if (env.passwordProtected) {
      const storedVal = sessionStorage.getItem('password-wall-passed');
      if (storedVal === 'false') {
        this.showContent = false;
      } else if (storedVal === 'true') {
        this.showContent = true;
      } else {
        this.showContent = !env.passwordProtected;
      }
    }
  }

  login(evt): void {
    evt.preventDefault();
    evt.stopPropagation();

    const formData = new FormData(evt.currentTarget);

    const username = formData.get('username');
    const password = formData.get('password');
    const { username: desiredUsername, password: desiredPassword } =
      this.env.passwordProtected;

    if (username === desiredUsername && password === desiredPassword) {
      this.showContent = true;
      sessionStorage.setItem('password-wall-passed', 'true');
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
