({
    // In the examples, the THEN will be just setting attr2, for simplicity
    onInit : function(cmp, event, helper) {
        cmp.set('v.attr2', 'cmp initialized');
    },
    onAttr1Change : function(cmp, event, helper) {
        cmp.set('v.attr2', 'attr1 changed');
    },
    onMethodCall : function(cmp, event, helper) {
        cmp.set('v.attr2', 'method invoked');
    },
    onMethodCallAsync : function(cmp, event, helper) {
        setTimeout(() => {
            cmp.set('v.attr2', 'async method invoked');
        }, 500);
    },
    onInteractWithDOM: function(cmp, event, helper) {
        cmp.set('v.attr2', 'link clicked');
    },
    onCmpEvent: function(cmp, event, helper) {
        cmp.set('v.attr2', 'cmp event fired');
    },
    onAppEvent: function(cmp, event, helper) {
        cmp.set('v.attr2', 'app event fired');
    }
})
