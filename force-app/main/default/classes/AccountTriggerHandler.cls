public with sharing class AccountTriggerHandler {

    public static void CreateAccounts(List<Account> acctList){

        for (Account acct : acctList) {
            
            if (acct.ShippingState != acct.BillingState) {
                acct.ShippingState = acct.BillingState;
            }
                
            }
            
        }

    }
