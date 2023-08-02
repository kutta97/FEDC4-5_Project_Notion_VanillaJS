export default class Document {
  constructor(
    id = null,
    title = '',
    content = null,
    documents = [],
    path = [],
    createdAt = '',
    updatedAt = ''
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.documents = documents;
    this.path = path;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
