/* global chai, sinon */
describe('c:parent', function () {

    const expect = chai.expect;
    const sandbox = sinon.sandbox.create();

    afterEach(function () {
        $T.clearRenderedTestComponents();
        sandbox.restore();
    });

    describe('Test suite for parent component - possible WHENs', function () {

        it('Should set attr2 on init', function () {
            return $T.createComponent('c:parent', null).then(function (cmp) {

                // GIVEN

                // WHEN
                // We don't have to do anything! Just creating the component
                // will fire any logic in the onInit function

                // THEN
                expect(cmp.get('v.attr2')).to.equal('component initialized');
            });
        });

        it('Should set attr2 on method call', function () {
            return $T.createComponent('c:parent', null).then(function (cmp) {

                // GIVEN
                const attr1 = 'my attr 1';

                // WHEN

                cmp.doWhatever(attr1);

                // THEN
                expect(cmp.get('v.attr2')).to.equal('method invoked');
            });
        });

        it('Should set attr2 on link click', function () {
            // We need to specify we want the DOM to be rendered
            // to the createComponent function
            return $T.createComponent('c:parent', {}, true).then(function (cmp) {

                // GIVEN

                // WHEN
                // As cmp.find returns an aura cmp, we need to obtain
                // the correspondant DOM element from it
                const link = cmp.find('my-link').getElement();
                link.click();

                // THEN
                expect(cmp.get('v.attr2')).to.equal('link clicked');
            });
        });

        it('Should set attr2 when cmp event is fired', function () {
            return $T.createComponent('c:parent', null).then(function (cmp) {

                // GIVEN

                // WHEN
                const event = cmp.getEvent('myCmpEvent');
                event.setParams({cmpAttr1: 'attr 1'});
                event.fire();

                // THEN
                expect(cmp.get('v.attr2')).to.equal('cmp event fired');
            });
        });

        it('Should set attr2 when app event is fired', function () {
            return $T.createComponent('c:parent', null).then(function (cmp) {

                // GIVEN

                // WHEN
                $T.fireApplicationEvent("c:appEvt", {cmpAttr1: 'attr 1'});

                // THEN
                expect(cmp.get('v.attr2')).to.equal('app event fired');
            });
        });

    });

});
