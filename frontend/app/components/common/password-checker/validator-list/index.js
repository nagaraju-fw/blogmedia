import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PasswordCheckerComponent extends Component {
  @tracked errors = {
    password: '',
    confirmPassword: '',
  };

  @tracked password_validation_list = [
    { regex: /.{8,}/, text: 'Minimum 8 character long', valid: false },
    { regex: /[0-9]/, text: 'Minimum 1 number', valid: false },
    { regex: /[a-z]/, text: 'Minimum 1 lowercase letter', valid: false },
    { regex: /[A-Z]/, text: 'Minimum 1 uppercase letter', valid: false },
    {
      regex: /[^A-Za-z0-9]/,
      text: 'Minimum 1 special character',
      valid: false,
    },
  ];

  @action
  validatePassword() {
    this.password_validation_list = this.password_validation_list.map(
      (item) => {
        return {
          regex: item.regex,
          text: item.text,
          valid: item.regex.test(this.args.password),
        };
      }
    );
    if (this.args.onPasswordValid) {
      this.args.onPasswordValid(
        this.args.id,
        this.password_validation_list.every((item) => item.valid)
      );
    }
  }
}
