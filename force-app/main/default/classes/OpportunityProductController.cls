public with sharing class OpportunityProductController {
   
    @AuraEnabled(cacheable = true)
    public static List<OpportunityLineItem> getOpportunityProducts(String oppId){

        List<OpportunityLineItem> oppProductsRecords = [SELECT Id, Name, Quantity, UnitPrice, ServiceDate, OpportunityId 
        FROM OpportunityLineItem WHERE OpportunityId = :oppId ];

        return oppProductsRecords;


    }

    @AuraEnabled
    public static void updateOpportunityProducts(List<OpportunityLineItem> oppProductsForUpdate) {

        update oppProductsForUpdate;
    }

    @AuraEnabled(cacheable = true)
    public static Double getTotalAmount(String oppId){

        Opportunity opp = [SELECT Id, Amount FROM Opportunity WHERE Id = : oppId];
        Double Amount = opp.Amount;

        return Amount;
    }
        
}