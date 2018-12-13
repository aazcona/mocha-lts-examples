/* global chai, sinon */
describe('c:whenUseCases', () => {

    const expect = chai.expect;
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        $T.clearRenderedTestComponents();
        sandbox.restore();
    });

    describe('Test suite for possible WHENs use cases', () => {

        it('Should set attr2 on init', () => {
            return $T.createComponent('c:whenUseCases', null).then((cmp) => {
                // GIVEN

                // WHEN
                // We don't have to do anything! Just creating the component
                // will fire any logic in the onInit function

                // THEN
                expect(cmp.get('v.attr2')).to.equal('cmp initialized');
            });
        });

        it('Should set attr2 on attr change', () => {
            return $T.createComponent('c:whenUseCases', null).then((cmp) => {
                // GIVEN
                const attr1 = 'my attr 1';

                // WHEN
                cmp.set('v.attr1',attr1);

                // THEN
                expect(cmp.get('v.attr2')).to.equal('attr1 changed');
            });
        });

        it('Should set attr2 on method call', () => {
            return $T.createComponent('c:whenUseCases', null).then((cmp) => {
                // GIVEN
                const attr1 = 'my attr 1';

                // WHEN
                cmp.methodCall(attr1);

                // THEN
                expect(cmp.get('v.attr2')).to.equal('method invoked');
            });
        });

        it('Should set attr2 on method call async', () => {
            return $T.createComponent('c:whenUseCases', null).then((cmp) => {
                // GIVEN

                // WHEN
                cmp.methodCallAsync();

                // THEN
                $T.waitFor(() => {
                    return cmp.get('v.attr2') === 'async method invoked';
                }).then(() => {
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
        });

        it('Should set attr2 on link click', () => {
            // We need to specify we want the DOM to be rendered
            // to the createComponent function
            return $T.createComponent('c:whenUseCases', {}, true).then((cmp) => {
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

        it('Should set attr2 when cmp event is fired - calling done()', (done) => {
            $T.createComponent('c:whenUseCases', null).then((cmp) => {
                // GIVEN
                const attr1 = 'my attr 1';

                // WHEN
                // As it is a cmp event, it must be fired by a child component in order to be listened by the parent
                const event = cmp.find('child-cmp').getEvent('myCmpEvent');
                event.setParams({cmpAttr1: attr1});
                event.fire();

                // THEN
                expect(cmp.get('v.attr2')).to.equal('cmp event fired');
                done();
            }).catch(e => {
                done(e);
            });
        });

        it('Should set attr2 when cmp event is fired - returning a promise', () => {
            return $T.createComponent('c:whenUseCases', null).then((cmp) => {
                // GIVEN
                const attr1 = 'my attr 1';

                // WHEN
                // As it is a cmp event, it must be fired by a child component in order to be listened by the parent
                const event = cmp.find('child-cmp').getEvent('myCmpEvent');
                event.setParams({cmpAttr1: attr1});
                event.fire();

                // THEN
                expect(cmp.get('v.attr2')).to.equal('cmp event fired');
            });
        });

        it('Should set attr2 when app event is fired - returning a promise', () => {
            return $T.createComponent('c:whenUseCases', null).then((cmp) => {
                // GIVEN
                const attr1 = 'my attr 1';

                // WHEN
                $T.fireApplicationEvent("c:appEvent", {cmpAttr1: attr1});

                // THEN
                expect(cmp.get('v.attr2')).to.equal('app event fired');
            });
        });

    });

});
