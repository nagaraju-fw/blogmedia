import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UiModalComponent extends Component {
  @action
  closeModal() {
    this.args.onCloseModal();
  }
}
