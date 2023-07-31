import Pathname from '@utils/pathname';
import { history, initRouter } from '@utils/router';

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
    this.$notionPage = new NotionPage(this.$target);
  }

  route() {
    const pathname = new Pathname(window.location.pathname);

    if (pathname.isRoot()) {
      this.$notionPage.setState({ documentId: null });
      return;
    }

    if (pathname.isDocument()) {
      const documentId = pathname.getDocumentId();

      this.$notionPage.setState({ documentId });
      return;
    }

    history.push('/');
  }
}
