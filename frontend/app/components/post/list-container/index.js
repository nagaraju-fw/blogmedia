import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PostListContainerComponent extends Component {
  @service('auth') auth;
  @service store;

  @tracked posts;

  @action
  fetchPosts() {
    let posts$;
    if (this.auth.currentUser && this.auth.currentUser.id) {
      posts$ = this.store.query('post', {
        user_id: this.auth.currentUser.id,
        limit: 10,
        async: true
      });
    } else {
      posts$ = this.store.findAll('post', { async: true });
    }

    posts$.then((posts) => {
      this.posts = posts;
    });
  }

  getPostCreator(post) {
    return post?.user?.name;
  }
}
