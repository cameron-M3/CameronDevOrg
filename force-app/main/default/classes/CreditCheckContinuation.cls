public with sharing class CreditCheckContinuation {
    
    @AuraEnabled(continuation = true)
    public static Object creditCheckApi (String accountId){

        Account acct = [SELECT Id, Name, Owner.Name, Owner.Email FROM Account WHERE Id = :accountId LIMIT 1];

        Continuation con = new Continuation(60);
        con.continuationMethod = 'processResponse';
        con.State ='Hi';

        String url = 'https://steve-wasula-splx201-dev-ed.my.salesforce-sites.com/creditcheck';

        url += '?name=' + EncodingUtil.urlEncode(acct.Name, 'UTF-8') 
            + '&email=' + acct.Owner.Email  
            + '&requestor=' + EncodingUtil.urlEncode(acct.Owner.Name, 'UTF-8');

            system.debug(url);

        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');


        con.addHttpRequest(req);

        return con;


    }

    @AuraEnabled(cacheable = true)
    public static Object processResponse(List<String>labels, Object State){

        HttpResponse response = Continuation.getResponse(labels[0]);
        return response.getBody();

    }
    
}