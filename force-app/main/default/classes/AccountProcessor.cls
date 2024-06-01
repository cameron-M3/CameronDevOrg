public with sharing class AccountProcessor {
    

    @future
    public static void countContacts(List<Id> accountsIds){

        List<Account> accounts = [SELECT Id,(SELECT Id FROM Contacts) FROM Account WHERE Id IN :accountsIds];

        for (Account acct : accounts) {
            

            acct.Number_of_Contacts__c = acct.Contacts.size();

            
        }

        update accounts;
    }
}