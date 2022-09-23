/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

import { ObjectIdTransform } from '../../transform/object-id-transform';
import { IsObjectId } from '../../validate/is-object-id';

export class ImportOneClientDto {
    /** the external id used by the customer to refer to this client */
    @IsString()
    @IsNotEmpty()
    externalId: string;

    /** id of customer who this client belongs to */
    @IsObjectId()
    @Transform(ObjectIdTransform)
    @Type(() => ObjectId)
    customerId: ObjectId;

    /** name of the client */
    @IsString()
    @IsNotEmpty()
    name: string;

    /** a longer description of the client */
    @IsString()
    description: string;
}
