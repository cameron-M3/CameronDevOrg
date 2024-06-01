public without sharing class LeadConversionService {
   
    @InvocableMethod
    public static void convertLead(List<Lead> leads){   

        List<Database.LeadConvert> massLeadConvert = new List<Database.LeadConvert>();

            for(Lead lead :leads){
                    
                List<Account> acct = [SELECT Id, Name FROM Account WHERE Name =:lead.Company LIMIT 1];

                    System.debug('Lead id is :'+lead.Id); 

                    Database.LeadConvert lc = new Database.LeadConvert();                      //create an instance of the LeadConvert class
                    lc.setLeadId(lead.Id);                                                     //pass Lead id into the setLeadId method

                        if(acct.size() > 0){                                                         //check to see if an Acct was returned
                            
                            Account foundAccount = acct[0];                                                

                            lc.setAccountId(foundAccount.Id);                                              //pass Acct id into the setAccountId method
                            System.debug('Setting Account to :'+ foundAccount.Name);
                        
                        }

                    LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];              //find the a converted LeadStatus
                    lc.setConvertedStatus(convertStatus.MasterLabel);                                                                //pass the MasterLabel into the setConvertedStatus method
                    
                    lc.setDoNotCreateOpportunity(true);                                                                           //Skip creation of Opportunity record  
                    massLeadConvert.add(lc); 

                }

                    if(!massLeadConvert.isEmpty()){

                        List<Database.LeadConvertResult> lcr = Database.convertLead(massLeadConvert);                   //Convert leads in mass - passing in Lead Convert objects

                    }
    }

}
