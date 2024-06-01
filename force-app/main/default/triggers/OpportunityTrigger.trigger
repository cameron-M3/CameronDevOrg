trigger OpportunityTrigger on Opportunity (After update) {

    if(Trigger.isAfter){

        if(Trigger.isUpdate){

            OpportunityTriggerHandler.createOrderOnClosedWon(Trigger.new, Trigger.oldMap);

        }
    }

}