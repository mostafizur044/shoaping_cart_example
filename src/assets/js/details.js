import DOMCreation from './domUtility';


export default function Details (utiliy) {

    const modalBody = utiliy.domQuery.getDomByQuery('.modal-body');

    this.createDetailPage = (product) => {
        const dom = DOMCreation.createDetailDom(product);
        utiliy.domQuery.setDomInnerHTML(modalBody, dom);
    };
}