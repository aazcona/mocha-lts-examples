({
    onInit : function(component, event, helper) {
        // Just set attr2 for simplicity
        component.set('v.attr2', 'component initialized');
    },
    onDoWhatever : function(component, event, helper) {
        // Just set attr2 for simplicity
        component.set('v.attr2', 'method invoked');
    },
    onLinkClick: function(component, event, helper) {
        // Just set attr2 for simplicity
        component.set('v.attr2', 'link clicked');
    },
    onMyCmpEvent: function(component, event, helper) {
        // Just set attr2 for simplicity
        component.set('v.attr2', 'cmp event fired');
    },
    onAppEvent: function(component, event, helper) {
        // Just set attr2 for simplicity
        component.set('v.attr2', 'app event fired');
    }
})
