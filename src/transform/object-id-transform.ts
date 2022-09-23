/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { TransformFnParams } from 'class-transformer';
import { ObjectId } from 'mongodb';

function toObjectId(value: unknown): (ObjectId | undefined)[] | ObjectId | undefined {
    if (Array.isArray(value)) {
        return value.flatMap(toObjectId);
    }

    if (value instanceof ObjectId) {
        return value;
    }

    if (typeof value === 'string' && ObjectId.isValid(value)) {
        return new ObjectId(value);
    }

    return undefined;
}

export function ObjectIdTransform({ value }: TransformFnParams): (ObjectId | undefined)[] | ObjectId | undefined {
    return toObjectId(value);
}
