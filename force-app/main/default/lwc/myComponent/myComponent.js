import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {

    showContacts;
    showObjects;

    contacts = [

        {Id:'111', Name:'John', LastName:'Smith', Title:'VP'},
        {Id:'222', Name:'Dagny', LastName:'Goggins', Title:'SVP'},
        {Id:'333', Name:'Cameron', LastName:'Jones', Title:'Salesforce Developer'}

    ]

    objects = [

        {Name:'Car'},
        {Name:'Dumbell'},
        {Name:'Steak'},
        {Name:'Ring'},
    ]

    toggleView(){

        this.showContacts = !this.showContacts;
        this.showObjects = !this.showObjects;
    }
}