import { SIDEBAR } from '@consts/target';
import URL from '@consts/url';

import { history } from '@utils/router';

import Component from '@core/Component';

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

      const { onExpand, onCreate, onDelete } = this.props;

      if (className === SIDEBAR.DOCUMENT_LIST_ITEM.EXPAND_BUTTON) {
        onExpand(id);
        return;
      }

      if (
        className === SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.DELETE_BUTTON
      ) {
        onDelete(id);
        return;
      }

      if (
        className ===
        SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.CREATE_INSIDE_BUTTON
      ) {
        onCreate(id);
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
