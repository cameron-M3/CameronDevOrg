import { LightningElement,api } from 'lwc';

export default class OppRecordForm extends LightningElement {

    @api recordId;
    @api apiName;
    @api layoutType = 'Compact';

    apiName ="Opportunity";
    

    toggleView(){

        if(this.layoutType == 'Compact'){
            this.layoutType = 'Full';
        }
        else{
            this.layoutType ='Compact';
        }
        console.log(this.layoutType);
        
    }
    

}