/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

import { ObjectIdTransform } from '../../transform/object-id-transform';
import { IsObjectId } from '../../validate/is-object-id';

export class ClientIdDto {
    @IsObjectId()
    @Transform(ObjectIdTransform)
    @Type(() => ObjectId)
    clientId: ObjectId;
}
