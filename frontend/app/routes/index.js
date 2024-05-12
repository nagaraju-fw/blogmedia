import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service('auth') auth;
  @service store;

  model() {
    const posts =
      this.auth.currentUser && this.auth.currentUser.id
        ? this.store.query('post', {
            user_id: this.auth.currentUser.id,
            limit: 10,
          })
        : this.store.findAll('post');
    return posts;
  }
}
