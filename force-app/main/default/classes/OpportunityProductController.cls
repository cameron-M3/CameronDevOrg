public with sharing class OpportunityProductController {
   
    public static List<OpportunityLineItem> getOpportunityProducts(String oppId){

        return [SELECT Id, Name, Quantity, UnitPrice, ServiceDate, OpportunityId FROM OpportunityLineItem WHERE OpportunityId = :oppId LIMIT 200 ];

    }
}