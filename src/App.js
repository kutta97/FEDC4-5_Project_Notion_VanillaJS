import Pathname from '@utils/pathname';
import { history, initRouter } from '@utils/router';

import Component from '@core/Component';

import store from '@stores/store';

import NotionPage from '@pages/NotionPage';

import './App.css';

export default class App extends Component {
  constructor($target) {
    super($target);

    initRouter(this.route.bind(this));
    store.init().then(() => this.route());
  }

  initChildComponents() {
    this.$notionPage = new NotionPage(this.$target);
  }

  route() {
    const pathname = new Pathname(window.location.pathname);

    if (pathname.isRoot()) {
      store.setDocumentId(null, () => {
        this.setState();
      });
      return;
    }

    if (pathname.isDocument()) {
      const documentId = pathname.getDocumentId();
      store.setDocumentId(documentId, async () => {
        await store.getDocument();
        this.setState();
      });
      return;
    }

    history.push('/');
  }

  setState() {
    this.$notionPage.setState();
  }
}
