import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getOpportunityProducts from '@salesforce/apex/OpportunityProductController.getOpportunityProducts';
import updateOpportunityProducts from '@salesforce/apex/OpportunityProductController.updateOpportunityProducts';
import NAME_FIELD from '@salesforce/schema/OpportunityLineItem.Name';
import QUANTITY_FIELD from '@salesforce/schema/OpportunityLineItem.Quantity';
import UNITPRICE_FIELD from '@salesforce/schema/OpportunityLineItem.UnitPrice';
import SERVICEDATE_FIELD from '@salesforce/schema/OpportunityLineItem.ServiceDate';
import getTotalAmount from '@salesforce/apex/OpportunityProductController.getTotalAmount';


export default class OppProductDatatable extends LightningElement {

    @api recordId;

    draftValues = [];
    totalAmount = 0;


    //create columns for datatable
     columns = [
        { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text', editable: true },
        { label: 'Quantity', fieldName: QUANTITY_FIELD.fieldApiName, type: 'number', editable: true },
        { label: 'Sales Price', fieldName: UNITPRICE_FIELD.fieldApiName, type: 'currency', editable: true },
        { label: 'Date', fieldName: SERVICEDATE_FIELD.fieldApiName, type: 'date', editable: true }
    ];


    @wire(getOpportunityProducts, {oppId: '$recordId'})
    oppProducts;
    
    //get total amount of all opportunity products
    @wire(getTotalAmount, {oppId: '$recordId'})
    wiredTotalAmount({error, data}) {
        if (data) {
            this.totalAmount = data;
        } else if (error) {
            console.log('Error getting total amount' + error);
        }
    }

    async handleSave(event){
        const updatedFields = event.detail.draftValues;

        this.draftValues = [];


        try {
            //pass edited fields to the updateOpportunity Apex Controller
            await updateOpportunityProducts({oppProductsForUpdate: updatedFields});


            //Report success with a Toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Opportunity Products Saved Successfully',
                    message: 'The opportunity products records was saved successfully',
                    variant: 'success'
                })
            );

            //Display fresh data in datatable
            await refreshApex(this.oppProducts);
            await refreshApex(this.totalAmount);

        } catch (error){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}