import RESTSerializer from '@ember-data/serializer/rest';

export default class PostSerializer extends RESTSerializer {
  keyForRelationship(key) {
    if (key === 'user') return 'user_id';
    return super.keyForRelationship(...arguments);
  }
}
