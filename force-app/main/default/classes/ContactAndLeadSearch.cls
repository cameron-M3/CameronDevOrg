public with sharing class ContactAndLeadSearch {
    

    public static List<List<sObject>> searchContactsAndLeads(String search){

        List<List<sObject>> searchList = [FIND :search IN ALL FIELDS
                    RETURNING Lead(FirstName,LastName),Contact(FirstName,LastName)];

                    return searchList;

    }
}