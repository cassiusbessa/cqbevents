import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import { Event, Producer } from '../../../database/models';
import {mockEvent, mockProducer} from '../../mocks'

describe('Base Repository', () => {
  describe('1 - Create', () => {
    before(() => {
      sinon.stub(Model, 'create')
        .onCall(0).resolves(mockEvent)
        .onCall(1).resolves(mockProducer);

    });
    after(() => {
      sinon.restore();
    });
    it('Should create a new entity', async () => {
      const event = await Event.create(mockEvent);
      const producer = await Producer.create(mockEvent.producer);
      expect(event).to.be.deep.equal(mockEvent);
      expect(producer).to.be.deep.equal(mockProducer);
    });
  });
});
