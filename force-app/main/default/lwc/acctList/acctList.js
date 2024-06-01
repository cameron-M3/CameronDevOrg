import { LightningElement, wire } from 'lwc';
import getTopAccounts from '@salesforce/apex/AccountController.getTopAccounts';
import AccountMC from '@salesforce/messageChannel/AccountMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class AcctList extends LightningElement {

    results;
    accounts= [];
    recordsFound = false;
    selectedId;
    selectedName;

    @wire(getTopAccounts)
    wiredOpps(accrecords){
        this.results = accrecords;
        
        if(this.results.data){
            console.log('Data Returned');
            console.log(this.results.data);
            this.accounts = this.results.data;
            this.recordsFound=true;

            this.selectedId = this.accounts[0].Id;
            this.selectedName = this.accounts[0].Name;

            publish(this.messageContext, AccountMC, { recordId: this.selectedId, accountName: this.selectedName} );

            //apply fitlers
        }
            if(this.results.errors){
                console.log('Error getting opps records from Account')
            }
    }

    @wire(MessageContext)
    messageContext;

    handleAcctSelect(event){
        this.selectedId = event.detail.prop1;
        this.selectedName = event.detail.prop2;
        
        publish(this.messageContext, AccountMC, { recordId: this.selectedId, accountName: this.selectedName} );

    }

}