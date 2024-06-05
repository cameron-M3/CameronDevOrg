import { LightningElement, api, wire, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getOpportunityProducts from '@salesforce/apex/OpportunityProductController.getOpportunityProducts';
import NAME_FIELD from '@salesforce/schema/OpportunityLineItem.Name';
import QUANTITY_FIELD from '@salesforce/schema/OpportunityLineItem.Quantity';
import UNITPRICE_FIELD from '@salesforce/schema/OpportunityLineItem.UnitPrice';
import SERVICEDATE_FIELD from '@salesforce/schema/OpportunityLineItem.ServiceDate';


export default class OppProductDatatable extends LightningElement {

    @api recordId; 

    results;
    records = [];
    tableDraftValues =[];


    //create columns for datatable
     @track columns = [
        { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text', editable: true },
        { label: 'Quantity', fieldName: QUANTITY_FIELD.fieldApiName, type: 'number', editable: true },
        { label: 'Sales Price', fieldName: UNITPRICE_FIELD.fieldApiName, type: 'currency', editable: true },
        { label: 'Date', fieldName: SERVICEDATE_FIELD.fieldApiName, type: 'date', editable: true }
    ];


    @wire(getOpportunityProducts, {oppId: '$recordId'})
    wiredOppProducts(opr){
        this.results = opr;

        if(this.results.data){
            console.log('data returned');
            this.records = this.results.data;
        }
        if(this.results.errors){
            console.log('error getting records')
        }
    }

    tableSave(event){
        this.tableDraftValues = event.detail.draftValues;

        const inputItems = this.tableDraftValues.slice().map(draft =>{
            var fields = Object.assign({}, draft);
            return { fields };
        })
        const promises = inputItems.map(recordInput => updateRecord(recordInput));
        Promise.all(promises)
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!',
                    message: 'Successfully updated the records.',
                    variant: 'success',
                    mode: 'dismissible'
                })
            );
            refreshApex(this.records);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!',
                    message: 'Error occurred updating records.',
                    variant: 'error',
                    mode: 'dismissible'
                })
            );
        }
        )
        .finally(result => {
            this.myDrafts = [];
            console.log('Finally');
            refreshApex(this.records);
        });



    }

}