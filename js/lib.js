export function html(strings, ...expressions) {
  return expressions.reduce((acc, exp, idx) => {
    // Fixes comma's with map functions 
    const flatExp = Array.isArray(exp) ? exp.join('') : exp;
    return acc + flatExp + strings[idx + 1]
  }, strings[0]).trim();
}

export class Component extends HTMLElement {
			// User hooks
 			render() {
      	throw new Error (`Render function should be implemented on ${this.constructor.name}`);
      }  
      
      onMounted() {}
      onUnmounted() {}
      onUpdated() {}
 
 	    constructor() {
	      super();        
        this.attachShadow({mode: 'open'});
        
        if (this.constructor.props) {
          // Set inital private props
          const privateProps = Object
            .entries(this.constructor.props)
            .reduce((acc, [key, val]) => (acc[`_${key}`] = val, acc), {});
          Object.assign(this, privateProps);

          // Set reactive getters and setters
          const gettersAndSetters = Object
            .entries(this.constructor.props)
            .reduce((acc, [key, val]) => (acc[key] = ({
              get: () => { return this[`_${key}`]; },
              set: (newVal) => { 
                this[`_${key}`] = newVal;
                this.update();
              }
            }), acc), {});
          Object.defineProperties(this, gettersAndSetters);
        }
        
        this.update();
	    }
 
 			// Internal methods
      update() {
        const rawHTML = this.render();
       	this.shadowRoot.innerHTML = rawHTML;
        
        const bindActions = (el) => {
         	if (el.hasAttributes()) {
           	for (const attr of el.attributes) {
            	if (attr.name.startsWith('@')) {   
                const funcName = attr.value.split('(')[0];
                const func = this[funcName].bind(this);
               	el.addEventListener(attr.name.slice(1), func)
              }
           	}
         	}
          
          Array.from(el.children).forEach(bindActions);
        }

				Array.from(this.shadowRoot.children).forEach(bindActions);
      }
	  
	    
			static get observedAttributes() {
      	const keys = this.props ? Object.keys(this.props) : [];
	      return keys;
	    }
      
      connectedCallback() {
      	this.onMounted();
        this.update();
      }
      
      disconnectedCallback() {
      	this.onUnmounted();
        // remove event listeners
      }
	    
	  	attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
	    	// this.update(); Automaticly updates
	    }
}
