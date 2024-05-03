public with sharing class CampaignMemberHandler {
    
    public static void updateContact(List<CampaignMember> CampaignMembers){

        List<Contact> contactsToUpdate = new List<Contact>();

        for(CampaignMember cm : CampaignMembers){
            
            Contact contact = [SELECT Id, FirstName, LastName FROM Contact WHERE Id = :cm.ContactId];

            contact.Last_Campaign__c = cm.CampaignId; 

            contactsToUpdate.add(contact);

        }

        if(!contactsToUpdate.isEmpty()){

            update contactsToUpdate;
        }

    }


}