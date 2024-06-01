import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {

    @api childName;
    @api age;

    childSpeak;
    


    respondToParent(event){

        this.childSpeak = event.detail.value;
        const myEvent = new CustomEvent('talk', {detail: {whatsaid:this.childSpeak, name: this.childName}});

        this.dispatchEvent(myEvent);
    }

    //view lifecycle

    constructor() {
        super();
        console.log('Child component - Constructor fired...')
    }

    connectedCallback(){
        console.log('Child component - connectedCallback fired..')

    }

    renderedCallback(){
        console.log('Child component - renderedCallback fired ...')

    }

    disconnectedCallback(){
        console.log('Child component - disconnectedCallback fired...')
    }



}