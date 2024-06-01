import { LightningElement, api, wire} from 'lwc';
import AccountMC from '@salesforce/messageChannel/AccountMessageChannel__c';
import { subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';

export default class AcctRelated extends LightningElement {

    @api accountId;
    @api accountName;
    subscription = {};
    oppLabel = "Opportunities";
    caseLabel = "Cases";

    // method to update the opp label based on record count received from the event
    updateOppLabel(event) {
        this.oppLabel = 'Opportunities' + ' (' + event.detail + ')';
    }

    // method to update the case label
    updateCaseLabel(event) {
        this.caseLabel = 'Cases' + ' (' + event.detail + ')';
    }


    @wire(MessageContext)
    messageContext;

    get relatedLabel() {
        return `Related Records for ${this.accountName}`;
    }


    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeFromMessageChannel();
    }


    // create a method to subscribe to the message channel
    subscribeToMessageChannel(){
        this.subscription = subscribe(this.messageContext, AccountMC, (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE });
    }

    // create a method to unsubscribe from the messsage channel
    unsubscribeFromMessageChannel() {
        unsubscribe(this.subscription);
    }

    handleMessage(message) {
        this.accountId = message.recordId;
        this.accountName = message.accountName;
        console.log('Message received and handled: ' + this.accountId + this.accountName);
    }


}