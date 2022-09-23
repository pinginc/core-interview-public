/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectId } from 'mongodb';

const IS_OBJECT_ID = 'isObjectId';

export function isObjectId(value: unknown): value is ObjectId {
    return value instanceof ObjectId && ObjectId.isValid(value);
}

export function IsObjectId(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: object, propertyName: string | symbol) {
        registerDecorator({
            constraints: [],
            name: IS_OBJECT_ID,
            options: validationOptions,
            propertyName: propertyName.toString(),
            target: object.constructor,
            validator: {
                defaultMessage: (): string => {
                    const eachPrefix = validationOptions?.each ? 'each value in ' : '';
                    return eachPrefix + '$property must be a bson object id';
                },
                validate: (value: unknown): boolean => isObjectId(value),
            },
        });
    };
}
