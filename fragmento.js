class miComponente123 extends HTMLElement {   
    constructor() {
        super();
        this.innerHTML= <p>the Chalenge</p>;
    }
}

customElements.define('teamASSE', miComponente123);
