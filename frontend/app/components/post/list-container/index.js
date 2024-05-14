import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class PostListContainerComponent extends Component {
  @service('auth') auth;
  @service store;
  @tracked posts;
  @tracked tabs;
  @tracked activeTab;

  HOME_TABS = Object.freeze({
    your_posts: 'common.your_posts',
    drafts: 'common.drafts',
    recently_published: 'common.recently_published',
  });

  constructor() {
    super(...arguments);
    this.tabs = this.auth.currentUser
      ? [
          {
            key: 'your_posts',
            value: this.HOME_TABS.your_posts,
            isActive: false,
          },
          { key: 'drafts', value: this.HOME_TABS.drafts, isActive: false },
        ]
      : [
          {
            key: 'recently_published',
            value: this.HOME_TABS.recently_published,
            isActive: false,
          },
        ];
  }

  @action
  fetchPosts() {
    this.onClickTab(this.tabs[0].key);
  }

  @action
  onClickTab(tabName) {
    this.activeTab = tabName;
    let posts$;

    switch (tabName) {
      case 'your_posts':
        this.activeTab = tabName;
        posts$ = this.store.query('post', {
          user_id: this.auth.currentUser.id,
          published: 1,
          limit: 10,
        });
        break;
      case 'drafts':
        posts$ = this.store.query('post', {
          user_id: this.auth.currentUser.id,
          published: 0,
          limit: 10,
        });
        break;
      default:
        posts$ = this.store.findAll('post');
        break;
    }

    posts$.then((posts) => {
      this.posts = posts;
    });
  }

  getPostCreator(post) {
    return post?.user?.name;
  }

  #fetchPosts() {}
}
