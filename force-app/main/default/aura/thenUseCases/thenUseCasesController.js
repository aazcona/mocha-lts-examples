({
    onSetAttribute : function(cmp, event, helper) {
        cmp.set('v.attr1', 'attribute set');
    },
    onReturnSomething : function(cmp, event, helper) {
        var params = event.getParam('arguments');
        if (params) {
            return 'You passed: ' + params.param1;
        }
    },
    onModifyDOMElement : function(cmp, event, helper) {
        cmp.find('my-link').getElement().innerHTML = 'Changed!';
    },
    onFireCmpEvent : function(cmp, event, helper) {
        const evt = cmp.getEvent('myCmpEvent');
        evt.setParams({cmpAttr1: 'my attr 1'});
        evt.fire();
    },
    onFireAppEvent : function(cmp, event, helper) {
        var evt = $A.get('e.c:appEvent');
        evt.setParams({cmpAttr1: 'my attr 1'});
        evt.fire();
    },
    onInvokeApex : function(cmp, event, helper) {
        var action = cmp.get('c.executeApex');
        action.setParams({ message : 'hi!' });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                cmp.set('v.attr1', response.getReturnValue());
            }
            else if (state === 'ERROR') {
                cmp.set('v.attr1', response.getError());
            }
        });

        $A.enqueueAction(action);
    },
    onCallChildMethod : function(cmp, event, helper) {
        cmp.find('child-cmp').methodCall('goodbye!');
    }
})
