public with sharing class OpportunityProductController {
   
    @AuraEnabled (cacheable = true)
    public static List<OpportunityLineItem> getOpportunityProducts(String oppId){

        List<OpportunityLineItem> oppProductsRecords = [SELECT Id, Name, Quantity, UnitPrice, ServiceDate, OpportunityId 
        FROM OpportunityLineItem WHERE OpportunityId = :oppId ];

        return oppProductsRecords;


    }
}