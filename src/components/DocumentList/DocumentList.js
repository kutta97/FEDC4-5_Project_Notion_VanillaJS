import { SIDEBAR } from '@consts/target';
import URL from '@consts/url';

import { history } from '@utils/router';

import Component from '@core/Component';

import store from '@stores/store';

import DocumentListItem from '@components/DocumentList/Item/DocumentListItem';

import './DocumentList.css';

export default class DocumentList extends Component {
  setup() {
    this.state = { documentList: [] };
  }

  initComponent() {
    this.$documentList = document.createElement('ul');
    this.$documentList.className = SIDEBAR.DOCUMENT_LIST;

    this.$target.appendChild(this.$documentList);
  }

  handleExpandButtonClick = (id) => {
    store.toggleDocumentListItem(id);
    this.setState();
  };

  handleCreateInsideButtonClick = async (id) => {
    store.createDocument(id, async (newDocument) => {
      const documentPath = URL.getDocumentDetailPath(newDocument.id);
      await store.getDocumentList();
      history.push(documentPath);
    });
  };

  handleDeleteButtonClick = async (id) => {
    store.deleteDocument(id, async () => {
      await store.getDocumentList();
      history.replace('/');
    });
  };

  setEvent() {
    this.$documentList.addEventListener('click', ({ target }) => {
      const $li = target.closest(`.${SIDEBAR.DOCUMENT_LIST_ITEM.ROOT}`);

      if (!$li) return;
      if ($li.className === SIDEBAR.DOCUMENT_LIST_ITEM.EMPTY) return;

      const { id } = $li.dataset;
      const documentPath = URL.getDocumentDetailPath(id);

      const $button = target.closest('button');
      if (!$button) {
        history.push(documentPath);
        return;
      }
      const { className } = $button;

      if (className === SIDEBAR.DOCUMENT_LIST_ITEM.EXPAND_BUTTON) {
        this.handleExpandButtonClick(id);
        return;
      }

      if (
        className === SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.DELETE_BUTTON
      ) {
        this.handleDeleteButtonClick(id);
        return;
      }

      if (
        className ===
        SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.CREATE_INSIDE_BUTTON
      ) {
        this.handleCreateInsideButtonClick(id);
        return;
      }

      history.push(documentPath);
    });
  }

  render() {
    const { documentList } = this.state;

    this.$documentList.innerHTML = '';
    documentList.forEach((documentItem) => {
      const $div = document.createElement('li');

      new DocumentListItem($div, { documentItem });

      this.$documentList.appendChild($div);
    });
  }
}
