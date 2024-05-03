public without sharing class LeadConversionService {
   
    @InvocableMethod
    public static void convertLead(List<Lead> leads){   

        List<Database.LeadConvert> massLeadConvert = new List<Database.LeadConvert>();

            for(Lead lead :leads){
                    Account acct = [SELECT Id, Name FROM Account WHERE Name =:lead.Company];    //find Account

                    System.debug('Lead id is :'+lead.Id); 

                    Database.LeadConvert lc = new Database.LeadConvert();                      //create an instance of the LeadConvert class
                    lc.setLeadId(lead.Id);                                                     //pass Lead id into the setLeadId method

                    if(!String.isBlank(acct.Name)){                                            //check to see if an Acct was returned
                        lc.setAccountId(acct.Id);                                              //pass Acct id into the setAccountId method
                        System.debug('Setting Account to :'+ acct.Name);
                    }

                    LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];              //find the a converted LeadStatus
                    lc.setConvertedStatus(convertStatus.MasterLabel);                                                                //pass the MasterLabel into the setConvertedStatus method

                    massLeadConvert.add(lc); 

                }

                    if(!massLeadConvert.isEmpty()){

                        List<Database.LeadConvertResult> lcr = Database.convertLead(massLeadConvert); //Convert leads in mass - passing in Lead Convert objects

                    }
    }

}
    /*public static void checkConditions(List<Lead> leads, Map<Id,Lead> oldLeads){

        for( Lead lead : leads){  

            if(lead.Company =='17Grapes'){

                convertLead(lead.Id);

            }
        }
    }
}*/