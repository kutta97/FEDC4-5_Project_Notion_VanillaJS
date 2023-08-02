import { DOCUMENT } from '@consts/target';

import Component from '@core/Component';

import store from '@stores/store';

import DocumentBottomNav from '@components/DocumentBottomNav/DocumentBottomNav';
import NotionEditor from '@components/Editor/NotionEditor';
import Header from '@components/Header/Header';

import './NotionDocument.css';

export default class NotionDocument extends Component {
  initComponent() {
    this.$document = document.createElement('div');
    this.$document.className = DOCUMENT.ROOT;

    this.$target.appendChild(this.$document);
  }

  initChildComponents() {
    const { onEdit } = this.props;

    this.$header = new Header(this.$document);

    this.$editorContainer = document.createElement('div');
    this.$editorContainer.className = 'notion-editor-container';

    this.$editor = new NotionEditor(this.$editorContainer, { onEdit });
    this.$document.appendChild(this.$editorContainer);

    this.$bottomNav = new DocumentBottomNav(this.$document);
  }

  setState() {
    super.setState();
    const { documentId, document } = store.state;

    if (documentId === null) return;

    const { id, title, content, path, documents } = document;

    this.$header.setState({ path });
    this.$editor.setState({ id, title, content });
    this.$bottomNav.setState({ paths: documents });
  }

  render() {
    const { documentId } = store.state;
    const isVisible = Boolean(documentId);

    this.$document.style.visibility = isVisible ? 'visible' : 'hidden';
  }
}
