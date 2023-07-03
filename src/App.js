import { initRouter } from '@utils/router';

import Component from '@core/Component';

import NotionPage from '@pages/NotionPage';

import './App.css';

export default class App extends Component {
  constructor($target) {
    super($target);

    initRouter(this.route.bind(this));
    this.route();
  }

  initChildComponents() {
    this.$notionPage = new NotionPage(this.$target, {
      getDocumentId: this.getDocumentId.bind(this),
    });
  }

  getDocumentId() {
    const { pathname } = window.location;
    const [, , documentId] = pathname.split('/');

    return documentId ?? null;
  }

  route() {
    this.$notionPage.setState();
  }
}
