import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CommonHeaderComponent extends Component {
  @service auth;

  @action
  onNavAction(type) {
    switch (type) {
      case 'loginRegister':
        this.args.openModalAction('loginRegister');
        break;
      case 'logout':
        this.args.onLogout();
        break;
      default:
        this.args.openProfileAction();
        break;
    }
  }
}
