

const articleTemplate = document.createElement('template');
articleTemplate.innerHTML = `
    <style>
    h1{
        color: red;
    }
    </style>
    <h1>article title</h1>
`;

class Article extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({mode:'open'});
        const template = document.querySelector('template');
        // this.appendChild(template.content.cloneNode(true));
        // this.shadowRoot.innerHTML = '<h1>Article</h1>';
        this.shadowRoot.appendChild(articleTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('h1').innerHTML = this.getAttribute('title');
    }

    //ovserve for change
    // static get observedAttributes() {
    //     return ['attribute-name'];
    // }

    //fires when attributes are changed
    // attributeChangedCallback() {

    // }

    connectedCallback() {
        console.log('element added to the dom');
    }

    disconnectedCallback() {
        console.log('element removed from the dom');
    }
}

window.customElements.define('app-article', Article);