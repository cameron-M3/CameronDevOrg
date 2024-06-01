import { LightningElement, api, wire} from 'lwc';
import AccountMC from '@salesforce/messageChannel/AccountMessageChannel__c';
import { subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class AcctDetail extends LightningElement {

    @api accountId;
    @api accountName;
    subscription = {};

    @wire(MessageContext)
    messageContext;

    get detailLabel() {
        return `Details for ${this.accountName}`;
    }


    handleSave() {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Account Updated',
            message: 'Account was successfully updated!',
            variant: 'success',
            mode: 'dismissible'
        }));
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

