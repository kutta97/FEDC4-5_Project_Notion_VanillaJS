export default class DocumentListItem {
  constructor(id = null, title = '', documents = [], path = []) {
    this.id = id;
    this.title = title;
    this.documents = documents;
    this.path = path;
  }
}
