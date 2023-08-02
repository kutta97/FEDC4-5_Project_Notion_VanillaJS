import Document from '@data/Document';
import DocumentListItem from '@data/DocumentListItem';

import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocumentList,
  updateDocument,
} from '@api/document';

class Store {
  constructor() {
    this.state = {
      documentId: null,
      document: new Document(),
      documentList: [],
      documentListExpanded: {},
    };
  }

  async init() {
    await this.getDocumentList();
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
  }

  setDocumentId(id, callback) {
    this.setState({ documentId: id });

    callback?.();
  }

  #toDocumentList = (list, path = []) =>
    list.map((item) => {
      const { id, title } = item;
      const documents = this.#toDocumentList(item.documents, [
        ...path,
        { id, title },
      ]);

      return new DocumentListItem(id, title, documents, path);
    });

  #getDocumentPath = (current) => {
    const { documentList } = this.state;
    const queue = [...documentList];

    let document;
    while (queue.length) {
      document = queue.shift();
      if (document.id === current.id) break;
      queue.push(...document.documents);
    }
    return [...document.path, current];
  };

  #toDocument = (object) => {
    const { id, title, content, documents, createdAt, updatedAt } = object;
    const path = this.#getDocumentPath({ id, title });

    return new Document(
      id,
      title,
      content,
      documents,
      path,
      createdAt,
      updatedAt
    );
  };

  async getDocumentList(callback) {
    try {
      const rs = await getDocumentList();
      const documentList = this.#toDocumentList(rs);

      this.setState({ documentList });

      callback?.();
    } catch (e) {
      console.error(e);
    }
  }

  async getDocument(callback) {
    try {
      const { documentId } = this.state;
      if (documentId === null) return;

      const rs = await getDocument(documentId);
      const document = this.#toDocument(rs);

      this.setState({ document });

      callback?.();
    } catch (e) {
      console.error(e);
    }
  }

  async createDocument(id, callback) {
    try {
      const newDocument = await createDocument({ title: '', parent: id });

      const document = this.#toDocument(newDocument);
      this.setState({ document });

      callback?.(document);
    } catch (e) {
      console.error(e);
    }
  }

  async updateDocument(doc, callback) {
    try {
      const updatedDocument = await updateDocument(doc.id, doc);

      const document = this.#toDocument(updatedDocument);
      this.setState({ document });

      callback?.();
    } catch (e) {
      console.error(e);
    }
  }

  async deleteDocument(id, callback) {
    try {
      await deleteDocument(id);

      callback?.();
    } catch (e) {
      console.error(e);
    }
  }

  clearDocument() {
    const document = new Document();
    this.setState({ document });
  }

  toggleDocumentListItem(documentId) {
    const { documentListExpanded } = this.state;

    documentListExpanded[documentId] = !documentListExpanded[documentId];
    this.setState({ documentListExpanded });
  }
}

const store = new Store();
export default store;
