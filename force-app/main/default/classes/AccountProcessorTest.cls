
@isTest
private class AccountProcessorTest {

    @isTest
    static void countContactsTest() {

        //Load Test data
        List<Account> accounts = new List<Account>();

        for (Integer i = 0; i < 300; i++){
            accounts.add(new Account(name = 'Test Account ' + i));
        }

        insert accounts;

        List<Contact> contacts = new List<Contact>();
        List<Id> accountIds = new List<Id>();

        for (Account acc : accounts){
            contacts.add(new Contact(FirstName = acc.Name, LastName = 'TestContact', AccountId = acc.Id));
            accountIds.add(acc.Id);
        }

        insert contacts;

        //Do the test
        Test.startTest();

        AccountProcessor.countContacts(accountIds);

        Test.stopTest();

        //Check result


        List<Account> accounts2 = [SELECT Id, Number_of_Contacts__c FROM Account];

        for (Account acc : accounts2){
            System.assertEquals(1, acc.Number_of_Contacts__c);
        
    }
}
}