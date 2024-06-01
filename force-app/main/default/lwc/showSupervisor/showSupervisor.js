import { LightningElement, api, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import SUPER_FIELD from '@salesforce/schema/Contact.ReportsToId';

export default class ShowSupervisor extends LightningElement {

        @api recordId;

        @wire(getRecord, {recordId: '$recordId', fields:[SUPER_FIELD]})
        contact;


}