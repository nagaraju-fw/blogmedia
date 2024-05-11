import RESTSerializer from '@ember-data/serializer/rest';

export default class UserSerializer extends RESTSerializer {
  serializeIntoHash(hash, typeClass, snapshot, options) {
    super.serializeIntoHash(hash, typeClass, snapshot, options);
    console.log(hash, typeClass, snapshot, options);
  }
}
