@isTest
public class AccountTriggerTest {
    
    static testMethod void testCreateAccounts() {
        // Create test data
        List<Account> testAccounts = new List<Account>();
        
        for(Integer i=0; i<200; i++) {
            Account acct = new Account(Name='Test Account ' + i, BillingState='CA', ShippingState='NY');
            testAccounts.add(acct);
        }
        
        // Call the method to be tested
        AccountTriggerHandler.CreateAccounts(testAccounts);
        
        // Verify the results
        for(Account acct : testAccounts) {
            System.assertEquals('CA', acct.ShippingState, 'ShippingState should be updated to match BillingState');
        }
    }
    
}