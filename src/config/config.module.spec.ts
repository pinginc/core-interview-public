/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { ConfigModule } from './config.module';

describe('ConfigModule', () => {
    it('should validate port', () => {
        const invalidPorts = ['-1', Infinity, NaN, 'abc', 'true', false, 10000000];
        const validPorts = [8000, '3000', '8080'];

        for (const port of invalidPorts) {
            expect(ConfigModule.validatePort(port)).toEqual(false);
        }

        for (const port of validPorts) {
            expect(ConfigModule.validatePort(port)).toEqual(true);
        }
    });

    it('should validate mongo uri', () => {
        const invalidMongoUris = ['https://www.google.com', 'abcd', undefined];
        const validMongoUris = ['mongodb://localhost:27017/db', 'mongodb://user:pass@remotehost.com/db?replicaSet=rs'];

        for (const uri of invalidMongoUris) {
            expect(ConfigModule.validateMongoUri(uri)).toEqual(false);
        }

        for (const uri of validMongoUris) {
            expect(ConfigModule.validateMongoUri(uri)).toEqual(true);
        }
    });
});
