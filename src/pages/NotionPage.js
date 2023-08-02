import { TARGET } from '@consts/target';

import documentStorage from '@utils/localStorage/documentStorage';

import { updateDocument } from '@api/document';

import Component from '@core/Component';

import NotionDocument from '@components/NotionDocument/NotionDocument';
import NotionSidebar from '@components/NotionSidebar/NotionSidebar';

import './NotionPage.css';

export default class NotionPage extends Component {
  initComponent() {
    this.$page = document.createElement('div');
    this.$page.className = TARGET.PAGE.NOTION;
    this.$target.appendChild(this.$page);
  }

  initChildComponents() {
    this.$sidebar = new NotionSidebar(this.$page);
    this.$document = new NotionDocument(this.$page, {
      onEdit: this.onEdit.bind(this),
    });
  }

  async onEdit(editorName, document) {
    documentStorage.setDocumentItem(document);

    const updatedDocument = await updateDocument(document.id, document);
    if (editorName === 'title') {
      this.fetchDocumentList();
    }

    this.$document.setState({ isVisible: true, documentData: updatedDocument });
  }

  setState() {
    this.$sidebar.setState();
    this.$document.setState();
  }
}
