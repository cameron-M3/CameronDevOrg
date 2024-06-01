import { LightningElement,api } from 'lwc';
import creditCheckApi from '@salesforce/apexContinuation/CreditCheckContinuation.creditCheckApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class AcctCard extends LightningElement {

    @api name;
    @api rating;
    @api industry;
    @api annualRevenue;
    @api acctId;
    creditObj ={};

    handleClick(){
        const clickEvent = new CustomEvent('selected', {detail: {'prop1': this.acctId, 'prop2': this.name}})
        this.dispatchEvent(clickEvent)
    }

     // create a method to invoke our creditCheckApi method to perform a credit check
     checkCredit() {
        // make a call to our creditCheckApi
        creditCheckApi({accountId: this.acctId})
            .then( response => {
                console.log(response);
                this.creditObj = JSON.parse(response);
                console.log(this.creditObj.Company_Name__c);

                // dispatch a toast message
                const toastEvent = new ShowToastEvent({
                    title: 'Credit Check Successful',
                    message: `Credit check approved for ${this.creditObj.Company_Name__c}!!!`,
                    variant: 'success',
                    mode: 'dismissible'
                });

                this.dispatchEvent(toastEvent);
            })
            .catch(
                error => console.log(error)
            );
    }



}