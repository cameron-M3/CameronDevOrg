trigger LeadTrigger on Lead (after update) {


    if(Trigger.isAfter && Trigger.isUpdate){

        LeadConversionService.convertLead(trigger.new);

        


    }

}