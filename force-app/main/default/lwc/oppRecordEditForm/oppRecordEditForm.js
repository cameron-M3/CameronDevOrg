import { LightningElement, api } from 'lwc';
import ACCOUNT_FIELD from '@salesforce/schema/Opportunity.AccountId';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';


export default class OppRecordEditForm extends LightningElement {
    @api recordId;
    editMode = false;

    accountField = ACCOUNT_FIELD;
    name = NAME_FIELD;
    amount = AMOUNT_FIELD;
    closeDate = CLOSEDATE_FIELD;
    stageName = STAGE_FIELD;


    toggleMode(){
        this.editMode = !this.editMode;
    }

}