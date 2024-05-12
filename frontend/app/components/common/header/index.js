import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CommonHeaderComponent extends Component {
  @service auth;

  @action
  onNavAction(type) {
    this.args.onNavAction(type);
  }
}
