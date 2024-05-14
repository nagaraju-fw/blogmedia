import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter {
  host = 'http://localhost:3001';
  get headers() {
    const token = document.cookie.match(/__freshblog_session\=([^;]*)/);
    return {
      Authorization: token && token[0].replace('__freshblog_session=', ''),
    };
  }
}
