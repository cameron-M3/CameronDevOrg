import { LightningElement, api } from 'lwc';
import { NavigationMixin} from 'lightning/navigation';
import RecordModal from 'c/recordModal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class ProductCard extends LightningElement {

    @api oppProductId;
    @api name;
    @api quantity;
    @api salesPrice;
    @api serviceDate;


    //method to open the RecordModal LWC and dispatch Toast
    editProduct(){
        RecordModal.open({                              //open the component and set attributes
            size: 'small',
            recordId: this.oppProductId,
            objectApiName: "OpportunityLineItem",
            formMode: 'edit',
            layoutType: 'Full',
            headerLabel: 'Edit Opportunity Product'
        })
        .then((result)=>{
            console.log(result);

            if(result == 'modsuccess' ){   //when the RecordModal lwc event message is "modsuccess"

                const successToast = new ShowToastEvent({
                    title: 'Opportunity Product Saved Successfully',
                    message: 'The opportunity product record was saved successfully',
                    variant: 'success',
                    mode: 'dismissible'
                });
                //event to tell parent component to refesh the records
                const saveEvent = new CustomEvent('modsaved');
                this.dispatchEvent(saveEvent);     //dispatch the save event - parent component will look for onmodsaved
                this.dispatchEvent(successToast);  //dispatch toast event - success!
            }
            if(result == 'modcancel'){   //when the RecordModal lwc event message is "modcancel"

                const cancelEvent = new ShowToastEvent({
                    title: 'No Changes Made',
                    message: '',
                    variant: 'info',
                    mode: 'dismissiable'
                });

                this.dispatchEvent(cancelEvent); //dispatch toast event - cancel :(


            }
        })

    }

    //method to handle click on Product Name
    viewProduct(){
        
        this[NavigationMixin]({
            type: 'standard__recordPage',
            attributes:{
                recordId: this.oppProductId,
                actionName: 'view'
            }

        });

    }

}