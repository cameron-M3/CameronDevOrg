public with sharing class AccountUtils {

    public static List<Account> accountsByState(String BillingState){
        List<Account> accounts = [SELECT Id, BillingState, Name FROM Account WHERE BillingState =: BillingState];
        return accounts;
    }

}