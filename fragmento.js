class miComponente123 extends HTMLElement {   
    constructor() {
        super();
        this.innerHTML= <p>the Challenge</p>;
    }
}

customElements.define('teamASSE', miComponente123);
