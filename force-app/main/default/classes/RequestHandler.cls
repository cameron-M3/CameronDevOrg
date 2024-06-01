public with sharing class RequestHandler {

    static List<User> userCameron = [SELECT Id, Name FROM User WHERE Name = 'Cameron Jones' LIMIT 1];

    static Map<String, Id> groupMap = new Map<String, Id>();


    public static void onInsert(List<Request__c> reqs){

        updateOwner(reqs);

    }

    public static void onUpdate(List<Request__c> reqs, Map<Id, Request__c> oldreqs){

        for(Request__c r : reqs){

            if(r.Type__c != oldreqs.get(r.Id).Type__c){

                updateOwner(reqs);
        
            }

            if(r.Message__c != oldreqs.get(r.Id).Message__c){

                //call send email class

            }
        }
        
    }

    public static void updateOwner(List<Request__c> reqs){

        List<Group> groups = [SELECT Id, Name FROM Group];

            for(Group g :groups){
                groupMap.put(g.Name, g.Id);
            }

            for( Request__c r :reqs){

                if(r.Type__c == 'Cameron'){

                    r.OwnerId = userCameron[0].Id;

                    }

                else{
                    
                    r.OwnerId = groupMap.get(r.Type__c); //set ownerId equal to the Id return from Map based on Name

                    }
            }
    }

}