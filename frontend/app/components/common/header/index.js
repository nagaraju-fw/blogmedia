import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CommonHeaderComponent extends Component {
  @action
  onNavAction(type) {
    this.args.onNavAction(type);
  }
}
