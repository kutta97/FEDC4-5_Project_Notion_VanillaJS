import { SIDEBAR } from '@consts/target';
import URL from '@consts/url';

import { history } from '@utils/router';

import Component from '@core/Component';

import store from '@stores/store';

import DocumentList from '@components/DocumentList/DocumentList';

import SidebarCreateButton from './CreateButton/SidebarCreateButton';
import './NotionSidebar.css';

export default class NotionSidebar extends Component {
  initComponent() {
    this.$sidebar = document.createElement('nav');
    this.$sidebar.className = SIDEBAR.ROOT;

    this.$target.appendChild(this.$sidebar);
  }

  initChildComponents() {
    this.$createButton = new SidebarCreateButton(this.$sidebar, {
      textContent: 'New document',
      onClick: this.handleCreateButtonClick.bind(this),
    });

    const $listContainer = document.createElement('div');
    $listContainer.className = SIDEBAR.CONTAINER.LIST;
    $listContainer.innerHTML = `
      <p>documents</p>
    `;

    this.$sidebar.appendChild($listContainer);
    this.$documentList = new DocumentList($listContainer, {
      onExpand: this.handleExpandButtonClick.bind(this),
      onCreate: this.handleCreateButtonClick.bind(this),
      onDelete: this.handleDeleteButtonClick.bind(this),
    });
  }

  handleExpandButtonClick(id) {
    store.toggleDocumentListItem(id);
    this.setState();
  }

  handleCreateButtonClick(id = null) {
    store.createDocument(id, async (newDocument) => {
      const documentPath = URL.getDocumentDetailPath(newDocument.id);
      await store.getDocumentList();
      history.push(documentPath);
    });
  }

  handleDeleteButtonClick(id) {
    store.deleteDocument(id, async () => {
      await store.getDocumentList();
      history.replace('/');
    });
  }

  setState() {
    const { documentList } = store.state;

    this.$documentList.setState({ documentList });
  }
}
