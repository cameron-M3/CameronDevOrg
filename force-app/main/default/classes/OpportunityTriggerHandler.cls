public with sharing class OpportunityTriggerHandler {


    public static void createOrderOnClosedWon(List<Opportunity> opps, Map<Id, Opportunity> oldOpps){

        for(Opportunity opp : opps){

            if (opp.IsClosed && opp.IsWon && opp.HasOpportunityLineItem && !oldOpps.get(opp.Id).IsWon){

                createOrders(opps);

            }

        }


    }
   

    public static void createOrders(List<Opportunity> opps){

        List<Order> orders =  new List<Order>();

        Map<Id,Contract> activeContracts = getContracts(opps);
        System.debug('Returned Contracts :' + activeContracts);

        for(Opportunity opp :opps){

            Order newOrder = new Order();

            Contract contract = activeContracts.get(opp.AccountId);

            newOrder.ContractId = contract.Id;
            newOrder.AccountId = opp.AccountId;
            newOrder.EffectiveDate = opp.CloseDate;
            newOrder.Status = 'Draft';
            newOrder.Pricebook2Id = opp.Pricebook2Id;

            System.debug(newOrder);

            insert newOrder;

            createOrderLineItems(newOrder.Id, opp.Id);
            
        }



    }

    public static Map<Id,Contract> getContracts(List<Opportunity> opps){

        Map<Id,Contract> activeContracts  = new Map<Id,Contract>();
        
        for(Opportunity opp : opps){

            List<Contract> activeContract = [
                SELECT Id, AccountId,StatusCode  FROM Contract
                 WHERE Contract.AccountId = :opp.AccountId AND
                  Contract.StatusCode = 'Activated' ORDER BY CreatedDate DESC LIMIT 1];

                Contract contract = activeContract[0];

                activeContracts.put(contract.AccountId, contract);
                
        }

        return activeContracts;

    }

    public static void createOrderLineItems (String OrderId, String OppId){

        Opportunity opp = [SELECT Id, Name FROM Opportunity WHERE Id =:OppId];


        List<OpportunityLineItem> oppLineItems = [SELECT Product2Id, Quantity, TotalPrice, UnitPrice, PricebookEntryId FROM OpportunityLineItem WHERE OpportunityId =:opp.Id ];
        System.debug('Opp Products returned from SOQL : '+ oppLineItems);

        List<OrderItem> newOi = new List<OrderItem>();

        for( OpportunityLineItem oli : oppLineItems){

            OrderItem oI = new OrderItem();

            oI.Product2Id = oli.Product2Id;
            oI.Quantity = oli.Quantity;
            oI.UnitPrice = oli.UnitPrice;
            oI.OrderId = OrderId;
            oI.PricebookEntryId = oli.PricebookEntryId;

            newOi.add(oI);



        }

        System.debug(newOi);
        
        insert newOi;





    }
}