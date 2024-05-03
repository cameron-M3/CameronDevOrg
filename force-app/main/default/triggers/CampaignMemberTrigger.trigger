trigger CampaignMemberTrigger on CampaignMember (after insert) {

    if(trigger.isAfter){

        if(trigger.isInsert){

            CampaignMemberHandler.updateContact(Trigger.new);

            }

    }

}