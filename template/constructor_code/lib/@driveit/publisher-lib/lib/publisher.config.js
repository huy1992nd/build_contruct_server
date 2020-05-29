"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pubsub_1 = require("@google-cloud/pubsub");
const publisherServiceAccount = JSON.parse(process.env.serviceAccountFirebaseAdmin || '{}');
//publisher===================
exports.publisher = new pubsub_1.PubSub({ credentials: publisherServiceAccount });
const projectId = process.env._PROJECT_ID || 'tc3s-dev';
exports.topics = {
    sales_master: 'projects/' + projectId + '/topics/migration-driveit-booking',
    customer_master: 'projects/' + projectId + '/topics/migration-driveit-customer',
    spec_master: 'projects/' + projectId + '/topics/migration-driveit-vehicle',
    auth: 'projects/' + projectId + '/topics/migration-driveit-auth',
    egovernment_master: 'projects/' + projectId + '/topics/migration-driveit-egovernment',
    general_master: 'projects/' + projectId + '/topics/migration-driveit-general',
    notification_master: 'projects/' + projectId + '/topics/migration-driveit-notification',
    service_master: 'projects/' + projectId + '/topics/migration-driveit-service',
    tradein_master: 'projects/' + projectId + '/topics/migration-driveit-tradein',
};
