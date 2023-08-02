import { TARGET } from '@consts/target';

import Component from '@core/Component';

import store from '@stores/store';

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
    store.updateDocument(document, async () => {
      if (editorName === 'title') {
        await store.getDocumentList();
        this.$sidebar.setState();
      }
      this.$document.setState();
    });
  }

  setState() {
    this.$sidebar.setState();
    this.$document.setState();
  }
}
