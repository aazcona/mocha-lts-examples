/* global chai, sinon */
describe('c:thenUseCases', () => {

    const expect = chai.expect;
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        $T.clearRenderedTestComponents();
        sandbox.restore();
    });

    describe('Test suite for possible THENs use cases', () => {

        it('Should set attr1 on method call', () => {
            return $T.createComponent('c:thenUseCases', null).then((cmp) => {
                // GIVEN

                // WHEN
                cmp.setAttribute();

                // THEN
                expect(cmp.get('v.attr1')).to.equal('attribute set');
            });
        });

        it('Should return correct value on method call', () => {
            return $T.createComponent('c:thenUseCases', null).then((cmp) => {
                // GIVEN
                const attr1 = 'my attr 1';

                // WHEN
                const returnValue = cmp.returnSomething(attr1);

                // THEN
                expect(returnValue).to.equal('You passed: ' + attr1);
            });
        });

        it('Should modify DOM element on method call', () => {
            // We need to specify we want the DOM to be rendered
            // to the createComponent function
            return $T.createComponent('c:thenUseCases', {}, true).then((cmp) => {
                // GIVEN

                // WHEN
                cmp.modifyDOMElement();

                // THEN
                expect(cmp.find('my-link').getElement().innerHTML).to.equal('Changed!');
            });
        });

        it('Should fire component event on method call', () => {
            return $T.createComponent('c:thenUseCases', null).then((cmp) => {
                // GIVEN
                const fakeEventHandler = sinon.spy();
                cmp.addEventHandler('myCmpEvent', fakeEventHandler);

                // WHEN
                cmp.fireCmpEvent();

                // THEN
                expect(fakeEventHandler.callCount).to.equal(1);

                const auraEvent = fakeEventHandler.getCall(0).args[0];
                const cmpAttr1 = auraEvent.getParam('cmpAttr1');

                expect(cmpAttr1).to.equal('my attr 1');
            });
        });

        it('Should fire app event on method call', () => {
            return $T.createComponent('c:thenUseCases', null).then((cmp) => {
                // GIVEN
                const fakeEventHandler = sinon.spy();
                cmp.addEventHandler('myAppEvent', fakeEventHandler);

                // WHEN
                cmp.fireAppEvent();

                // THEN
                expect(fakeEventHandler.callCount).to.equal(1);

                const auraEvent = fakeEventHandler.getCall(0).args[0];
                const cmpAttr1 = auraEvent.getParam('cmpAttr1');

                expect(cmpAttr1).to.equal('my attr 1');
            });
        });

        it('Should invoke Apex on method call - success response', () => {
            return $T.createComponent('c:thenUseCases', null).then((cmp) => {
                // GIVEN
                const dummyData = new Date().toUTCString();
                const dummyResponse = {
                    getState: () => { return 'SUCCESS'; },
                    getReturnValue: () => { return dummyData; }
                };

                const enqueueActionStub = sandbox.stub($A, 'enqueueAction').callsFake((action) => {
                    const cb = action.getCallback('SUCCESS');
                    cb.fn.apply(cb.s, [dummyResponse]);
                });

                // WHEN
                cmp.invokeApex();

                // THEN
                expect(enqueueActionStub.callCount).to.equal(1);

                const action = enqueueActionStub.getCall(0).args[0];
                const params = action.getParams();

                expect(action.getName()).to.equal('executeApex');
                expect(params.message).to.equal('hi!');
                expect(cmp.get('v.attr1')).to.equal(dummyData);
            });
        });

        it('Should invoke Apex on method call - error response', () => {
            return $T.createComponent('c:thenUseCases', null).then((cmp) => {
                // GIVEN
                const dummyData = new Date().toUTCString();
                const dummyResponse = {
                    getState: () => { return 'ERROR'; },
                    getError: () => { return dummyData; }
                };

                const enqueueActionStub = sandbox.stub($A, 'enqueueAction').callsFake((action) => {
                    const cb = action.getCallback('ERROR');
                    cb.fn.apply(cb.s, [dummyResponse]);
                });

                // WHEN
                cmp.invokeApex();

                // THEN
                expect(enqueueActionStub.callCount).to.equal(1);

                const action = enqueueActionStub.getCall(0).args[0];
                const params = action.getParams();

                expect(action.getName()).to.equal('executeApex');
                expect(params.message).to.equal('hi!');
                expect(cmp.get('v.attr1')).to.equal(dummyData);
            });
        });

        it('Should call child cmp method passing a parameter', () => {
            return $T.createComponent('c:thenUseCases', null).then((cmp) => {
                // GIVEN
                const spy = sinon.spy(cmp.find('child-cmp'), 'methodCall');

                // WHEN
                cmp.callChildMethod();

                // THEN
                expect(spy.calledOnce).to.be.true;
                expect(spy.getCall(0).args[0]).to.equal('goodbye!');
            });
        });

    });
});
