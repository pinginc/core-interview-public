/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { ObjectId } from 'mongodb';

export class Client {
    /** the internal id of this client */
    _id: ObjectId;

    /** the external id used by the customer to refer to this client */
    externalId: string;

    /** id of customer who this client belongs to */
    customerId: ObjectId;

    /** name of the client */
    name: string;

    /** a longer description of the client */
    description: string;

    /** date and time client was created at */
    createdAt: Date;

    /** date and time client was updated last */
    updatedAt: Date;

    /** if set, is the date and time client was deleted at */
    deletedAt?: Date | undefined;
}
