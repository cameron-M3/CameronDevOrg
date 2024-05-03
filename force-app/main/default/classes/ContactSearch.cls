public with sharing class ContactSearch {
    


    public static List<Contact> searchForContacts(String lastName, String postalCode) {
        List<Contact> matchingContacts = new List<Contact>();
        
        List<Contact> contacts = [SELECT Id, FirstName, LastName FROM Contact WHERE LastName = :lastName AND MailingPostalCode = :postalCode];
        
        for(Contact con : contacts) {
            matchingContacts.add(con);
        }
        
        return matchingContacts;
    }
}