import { helper as buildHelper } from '@ember/component/helper';

export function formatDate(params) {
  let date = params[0];

  if (!date) {
    date = new Date();
  }

  let year = date.getFullYear(),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2),
    hour = ('0' + date.getHours()).slice(-2),
    min = ('0' + date.getMinutes()).slice(-2),
    sec = ('0' + date.getSeconds()).slice(-2),
    formatted = `${year}-${month}-${day} ${hour}:${min}:${sec}`;

  return formatted;
}

export default buildHelper(formatDate);
