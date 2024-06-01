public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getTopAccounts(){

        return [SELECT Id, Name, Industry, Rating, AnnualRevenue FROM Account  ORDER BY AnnualRevenue DESC NULLS LAST LIMIT 5];
        //adding comments
        //adding more comments
    }
    
}
