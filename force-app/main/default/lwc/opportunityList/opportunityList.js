import { LightningElement, wire, api, track} from 'lwc';
import getOpportunites from '@salesforce/apex/OpportunityController.getOpportunites';
import { refreshApex } from '@salesforce/apex';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import OPP_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPP_AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import OPP_CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import { subscribe, unsubscribe } from 'lightning/empApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class OpportunityList extends LightningElement {

    @api recordId;
    
    results;
    allOpps=[];
    displayOpps=[];
    status ='All';
    recordsToDisplay = false;
    totalAmount = 0;
    totalRecords = 0;
    wiredPicklistValues =[];
    channelName = '/topic/Opportunities';
    subscription = {};
    displayMode ='Card';
    tableMode = false;
    tableDraftValues =[];



    @track displayOptions = [

        {value: 'Card', label: 'Card'},
        {value: 'Table', label: 'Table'}

    ]

    columns = [
        { label: 'Opportunity Name', fieldName: OPP_NAME_FIELD.fieldApiName, type: 'text', editable: true },
        { label: 'Amount', fieldName: OPP_AMOUNT_FIELD.fieldApiName, type: 'currency', editable: true },
        { label: 'Stage', fieldName: STAGE_FIELD.fieldApiName, type: 'text' },
        { label: 'Close Date', fieldName: OPP_CLOSEDATE_FIELD.fieldApiName, type: 'date' }
    ];

    handleTableSave(event){
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
        });
}

    @track stageOptions = [
        {value: 'All', label: 'All'},
        {value: 'Open', label: 'Open'},
        {value: 'Closed', label: 'Closed'},
        //{value: 'ClosedWon', label: 'Closed Won'},
        //{value: 'ClosedLost', label: 'Closed Lost'},
    ];

    get comboOptions(){
        return this.stageOptions.concat(this.wiredPicklistValues);
    }

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: STAGE_FIELD})
    wiredPicklist({data, error}) {
        if (data) {
            for (let item of data.values) {
                this.wiredPicklistValues.push( { value: item.value, label: item.label});
            }
        }
        if (error) {
            console.log('Error occurred retrieving picklist values....');
        }
    }

    @wire(getOpportunites, {accountId: '$recordId'})
    wiredOpps(opprecords){
        this.results = opprecords;
        
        if(this.results.data){
            console.log('Data Returned');
            console.log(this.results.data);
            this.allOpps = this.results.data;
            this.dispatchEvent(new CustomEvent('oppcount', {detail: this.allOpps.length}));
            //apply fitlers
            this.updateList();
        }
            if(this.results.errors){
                console.log('Error getting opps records from Account')
            }
    }

    connectedCallback(){
        this.subscribe2PT();
    }

    disconnectedCallback(){
        this.unsubscribe2PT();
    }

    subscribe2PT(){
        const messageCallBack = response =>{

            if(response.data.event.type === 'deleted'){
                if(this.allOpps.find(elem=>{ return elem.Id ===response.data.sobject.Id})){
                    this.refreshWire();
                }
            }else{

                if(response.data.sobject.AccountId === this.recordId){
                    this.refreshWire();
                }
            }
        }

        subscribe(this.channelName, -1, messageCallBack)
            .then(response =>{this.subscription = response});

    }

    unsubscribe2PT(){
        unsubscribe(this.subscription, response => { console.log('Unsubscribed successfully') });
    }


    handleChange(event){

        this.status = event.detail.value;
        this.updateList();
    }

    
    modeChange(event){
        this.tableMode = !this.tableMode;
    }


    updateList(){
        this.displayOpps= [];
        let currentRecord = {};

        if(this.status === 'All'){
            this.displayOpps = this.allOpps;
        }
        else{
            for(let i =0; i<this.allOpps.length; i++){
                currentRecord = this.allOpps[i];

                if(this.status ==='Open'){
                    if(!currentRecord.IsClosed){
                        this.displayOpps.push(currentRecord);
                    }
                } else if(this.status==='Closed'){
                    if(currentRecord.IsClosed){
                        this.displayOpps.push(currentRecord);
                    }
                } else if(this.status === currentRecord.StageName){
                        this.displayOpps.push(currentRecord);
                }
            }
        }

        this.recordsToDisplay = this.displayOpps.length > 0 ? true : false;
        this.totalRecords = this.displayOpps.length
        this.totalAmount = this.displayOpps.reduce((prev, curr)=> prev +(isNaN(curr.Amount) ? 0 : curr.Amount), 0);


    }

    refreshWire(){
        refreshApex(this.results);
    }

}