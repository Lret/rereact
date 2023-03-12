import { Component, html } from '/js/lib.js'

// My Counter
customElements.define('my-counter', class extends Component {
	render() {
    return `
    	<style>
      	div { background: blue; color: white; }
      </style>
    	<div @click="${this.testClick}">count ${this.count}<div>
		`
  }
  
  static props = {
  	count: 10,
  }
  
  testClick() {
  	this.count++;
  	/* console.log(this.count) */
  }
});

// My List
customElements.define('my-list', class extends Component {
	render() {
  	const numbs = [this.count + 10, this.count +  20, this.count +  30];
		//numbs.forEach(z => console.log(z))
  
    return html`
			<ul @click="${this.testClick}">
      	<my-li title="${this.count}""></my-li>
				<my-li title="${this.count + 1}""></my-li>
      	<my-li title="${this.count + 2}""></my-li>
				${numbs.map(num => `<my-li title="${num}""></my-li>`)}
      </ul>
		`
  }
  
  static props = {
  	count: 10,
  }
  
  testClick() {
  	this.count++;
  }
});

// My List item
customElements.define('my-li', class extends Component {
	render() {
    return `
    	<style>
      	li { background: red; }
      </style>
    	<li>${this.title}<div>
		`
  }
  
  static props = {
  	title: 'hello',
  }
});

// My Div
customElements.define('my-div', class extends Component {
	render() {
    return `
			<slot>My default ${this.title}</slot>		
		`}
  
  static props = {
  	title: 'hello',
  }
});