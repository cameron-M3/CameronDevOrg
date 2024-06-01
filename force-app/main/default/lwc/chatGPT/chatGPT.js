import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class ChatGPT extends LightningElement {
    accounts = [];
    name = NAME_FIELD;

    @wire(getListUi, {
        objectApiName: ACCOUNT_OBJECT.objectApiName,
        listViewApiName: 'AllAccounts'
    })
    wiredAccounts({error, data}) {
        if (data) {
            this.accounts = data.records.records;
        } else if (error) {
            console.error(error);
        }
    }
}