import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {


    childSaid;
    
    

    handleTalk(event){

        this.childSaid = event.detail.whatsaid;
        this.childName = event.detail.name;


    }
    constructor() {
        super();
        console.log('Parent component - Constructor fired...')
    }

    connectedCallback(){
        console.log('Parent component - connectedCallback fired..')

    }

    renderedCallback(){
        console.log('Parent component - renderedCallback fired ...')

    }

    disconnectedCallback(){
        console.log('Parent component - disconnectedCallback fired...')
    }

}
