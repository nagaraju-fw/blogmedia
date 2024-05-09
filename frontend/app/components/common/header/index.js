import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CommonHeaderComponent extends Component {
  @action
  onNavAction() {
    this.args.onNavAction();
  }
}
