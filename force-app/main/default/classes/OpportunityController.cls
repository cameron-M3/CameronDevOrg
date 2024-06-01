public with sharing class OpportunityController {
   
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunites(String accountId){

        List<Opportunity> opps =   [SELECT Id, Name, StageName, CloseDate, Amount, IsWon, IsClosed, AccountId 
                                    FROM Opportunity WHERE AccountId =: accountId 
                                    WITH SECURITY_ENFORCED];

        return opps;
    }
}