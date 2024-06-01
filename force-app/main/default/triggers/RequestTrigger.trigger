trigger RequestTrigger on Request__c (before insert, before update) {

    if(Trigger.isBefore){

        if(Trigger.isInsert){

            RequestHandler.onInsert(Trigger.new);

        }

        if(Trigger.isUpdate){

            RequestHandler.onUpdate(Trigger.new, Trigger.oldMap);

        }

    }

}