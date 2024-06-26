/**
 * This class contains unit tests for validating the behavior of Apex classes
 * and triggers.
 *
 * Unit tests are class methods that verify whether a particular piece
 * of code is working properly. Unit test methods take no arguments,
 * commit no data to the database, and are flagged with the testMethod
 * keyword in the method definition.
 *
 * All test methods in an org are executed whenever Apex code is deployed
 * to a production org to confirm correctness, ensure code
 * coverage, and prevent regressions. All Apex classes are
 * required to have at least 75% code coverage in order to be deployed
 * to a production org. In addition, all triggers must have some code coverage.
 * 
 * The @isTest class annotation indicates this class only contains test
 * methods. Classes defined with the @isTest annotation do not count against
 * the org size limit for all Apex scripts.
 *
 * See the Apex Language Reference for more information about Testing and Code Coverage.
 */
@isTest
private class DailyLeadProcessorTest {

    private static string CRON_EXP = '0 0 0 ? * * *';

    @isTest
    static void DailyLeadProcessorTestMethod() {

        List<Lead> leads = new List<Lead>();

        for(Integer i =0; i<500; i++){

            if(i < 250){
                leads.add(new Lead(LastName='Jones', Company='Salesforce'));

            } else{
                leads.add(new Lead(LastName='Jones', Company='Salesforce', LeadSource = 'Other'));
            }
        }

        insert leads;

        Test.startTest();
        String jobId = System.schedule('Process Leads', CRON_EXP, new DailyLeadProcessor());
        Test.stopTest();

        List<Lead> updatedleads = [SELECT Id, LeadSource  FROM Lead WHERE LeadSource ='Dreamforce'];
        System.assertEquals(200, updatedleads.size(), 'Error');


        List<CronTrigger> cts = [SELECT Id, TimesTriggered, NextFireTime FROM CronTrigger WHERE Id =:jobId];
        System.debug('Next fire time ' + cts[0].NextFireTime);

    }
}