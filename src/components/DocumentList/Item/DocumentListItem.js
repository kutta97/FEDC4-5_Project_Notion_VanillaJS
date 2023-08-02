import AddIcon from '@public/add.svg';
import CollapsedIcon from '@public/collapsed.svg';
import ExpandedIcon from '@public/expanded.svg';
import TrashIcon from '@public/trash.svg';

import { SIDEBAR } from '@consts/target';

import Component from '@core/Component';

import store from '@stores/store';

import DocumentListEmptyItem from '../EmptyItem/DocumentListEmptyItem';
import './DocumentListItem.css';

export default class DocumentListItem extends Component {
  initComponent() {
    const { documentId: selectedDocumentId, documentListExpanded: expanded } =
      store.state;
    const { documentItem } = this.props;
    const { id, title, path } = documentItem;

    this.$documentListItem = document.createElement('div');
    this.$documentListItem.className = SIDEBAR.DOCUMENT_LIST_ITEM.ROOT;
    this.$documentListItem.dataset.id = id;
    this.$documentListItem.setAttribute('selected', id === selectedDocumentId);

    this.$documentListItem.innerHTML = `
      <button class="${SIDEBAR.DOCUMENT_LIST_ITEM.EXPAND_BUTTON}">
        <img src="${
          expanded[documentItem.id] ? ExpandedIcon : CollapsedIcon
        }" alt="Image" height="12" width="12">
      </button>
      <a class="${SIDEBAR.DOCUMENT_LIST_ITEM.TITLE}">${title || 'Untitled'}</a>
      <div class="${SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.ROOT}">
        <button class="${
          SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.DELETE_BUTTON
        }">
          <img src="${TrashIcon}" alt="Image" height="14" width="14">
        </button>
        <button class="${
          SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.CREATE_INSIDE_BUTTON
        }">
          <img src="${AddIcon}" alt="Image" height="14" width="14">
        </button>
      </div>
    `;
    this.$documentListItem.style.paddingLeft = `${(path.length + 1) * 10}px`;

    this.$childDocuments = document.createElement('div');
    this.$childDocuments.className = SIDEBAR.DOCUMENT_LIST_ITEM.CHILD_GROUP;

    this.$target.appendChild(this.$documentListItem);
    this.$target.appendChild(this.$childDocuments);
  }

  createDocumentItem(documentItem) {
    const $div = document.createElement('div');

    new DocumentListItem($div, { documentItem });

    return $div;
  }

  createDocumentDocumentItem(path) {
    const $div = document.createElement('div');

    new DocumentListEmptyItem($div, { path });

    return $div;
  }

  render() {
    const { documentListExpanded: expanded } = store.state;
    const { documentItem } = this.props;
    const { documents: childItems, path } = documentItem;

    if (!expanded[documentItem.id]) return;

    if (childItems.length === 0) {
      const $documentEmptyItem = this.createDocumentDocumentItem([
        ...path,
        documentItem,
      ]);
      this.$target.appendChild($documentEmptyItem);
      return;
    }

    childItems.forEach((document) => {
      const $documentItem = this.createDocumentItem(document);
      this.$childDocuments.appendChild($documentItem);
    });
  }
}
