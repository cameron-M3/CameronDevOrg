public with sharing class AccountHandler {
    

    public static Account insertNewAccount(String str){

        Account acct = new Account(Name = str);

        try {
            insert acct;
        } catch (DmlException e) {
            system.debug('A DML exception has occured: ' + e.getMessage());
            return null;
        }

        return acct;


    }
}