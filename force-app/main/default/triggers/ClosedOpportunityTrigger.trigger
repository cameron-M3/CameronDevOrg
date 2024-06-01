trigger ClosedOpportunityTrigger on Opportunity (after insert, after update) {

    List<Task> newTasksToCreate = new List<Task>();

    for (Opportunity opp : Trigger.new) {
        
        Task t = new Task();
        t.Subject = 'Follow Up Test Task';
        t.WhatId = opp.Id;

        if (opp.StageName == 'Closed Won') {
            newTasksToCreate.add(t);
        }
    }


    if (newTasksToCreate.size() > 0) {
        insert newTasksToCreate;
    }

}