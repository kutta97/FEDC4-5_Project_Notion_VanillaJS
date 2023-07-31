const ROOT_PAGE = /^\/$/;
const DOCUMENT_PAGE = /^\/documents\/\d+$/;
const DOCUMENT_ID = /\/(\d+)$/;

export default class Pathname {
  constructor(pathname) {
    this.pathname = pathname;
  }

  isRoot = () => ROOT_PAGE.test(this.pathname);

  isDocument = () => DOCUMENT_PAGE.test(this.pathname);

  getDocumentId = () => {
    const [, documentId] = this.pathname.match(DOCUMENT_ID);
    return Number(documentId);
  };
}
