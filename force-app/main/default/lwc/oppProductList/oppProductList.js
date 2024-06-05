import { LightningElement, wire, api } from 'lwc';
import getOpportunityProducts from '@salesforce/apex/OpportunityProductController.getOpportunityProducts';
import { refreshApex } from '@salesforce/apex';

export default class OppProductList extends LightningElement {

    @api recordId;

    recordsToDisplay = true;
    oppProducts = [];
    results;



    @wire(getOpportunityProducts, {oppId: '$recordId'})
    wiredOppProducts(opr){
        this.results = opr;

        if(this.results.data){
            console.log('data returned');
            console.log(this.results.data);
            this.oppProducts = this.results.data;
            this.recordsToDisplay = true;
        }
        if(this.results.errors){
            console.log('Error getting opps records from Account')
        }
    }

    refreshWire(){
        refreshApex(this.results);
    }


}