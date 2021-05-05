import { GraphQLSchema, GraphQLObjectType } from "graphql";
import eventType from './types/eventType';
import eventsQuery from './queries/eventsQuery';
import eventQuery from './queries/eventQuery';
import addEventMutation from './mutations/addEvent';
import updateEventMutation from './mutations/updateEvent';
import deleteEventMutation from './mutations/deleteEvent';

import { PubSub } from 'graphql-subscriptions';
 
const pubsub = new PubSub();
const EVENT_ADDED = 'EVENT_ADDED';
const EVENT_DELETED = 'EVENT_DELETED';
const EVENT_UPDATED = 'EVENT_UPDATED';

const schema = (EventModel) => {
   
    const addEvent = addEventMutation(eventType, EventModel, pubsub, EVENT_ADDED );
    const updateEvent = updateEventMutation(eventType, EventModel, pubsub, EVENT_UPDATED );
    const deleteEvent = deleteEventMutation(eventType, EventModel, pubsub, EVENT_DELETED );

    const events = eventsQuery(eventType, EventModel);
    const event =  eventQuery(eventType, EventModel);


    const graphqlschema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
               events,
               event
            })
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                addEvent,
                updateEvent,
                deleteEvent
            })
        }),
        subscription: new GraphQLObjectType({
            name: 'Subscription',
            fields: () => ({
                addEvent: {
                    type: eventType,
                    description: "Subscription of Event Added",
                    resolve(payload) {
                        return payload;
                    },
                    subscribe: () => pubsub.asyncIterator(EVENT_ADDED)
                },
                updateEvent: {
                    type: eventType,
                    description: "Subscription of Event Updated",
                    resolve(payload) {
                        return payload;
                    },
                    subscribe: () => pubsub.asyncIterator(EVENT_UPDATED)
                },
                deleteEvent: {
                    type: eventType,
                    description: "Subscription of Event Deleted",
                    resolve(payload) {
                        return payload;
                    },
                    subscribe: () => pubsub.asyncIterator(EVENT_DELETED)
                }
            })           
        }),
    });

    return graphqlschema;
}


module.exports = schema;