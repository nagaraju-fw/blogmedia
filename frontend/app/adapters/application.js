import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter {
  host = 'http://localhost:3001';
  get headers() {
    return {
      Authorization: document.cookie
        .match(/__freshblog_session\=([^;]*)/)[0]
        .replace('__freshblog_session=', ''),
    };
  }
}
