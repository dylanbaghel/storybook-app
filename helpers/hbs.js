const moment = require('moment');

const truncate = (str, length, ending) => {
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
};

const stripTags = (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '');
};

const formatDate = (date, format) => {
  return moment(date).format(format);
};

const editIcon = (storyUser, loggedUser, storyId, floating = true) => {
  if (storyUser == loggedUser) {
    if (floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red">
          <i class="fas fa-pencil-alt"></i></a>`;
    } else {
      return `<a href="/stories/edit/${storyId}">
      <i class="fas fa-pencil-alt"></i></a>`;
    }
  } else {
    return '';
  }
};

module.exports = { truncate, stripTags, formatDate, editIcon };