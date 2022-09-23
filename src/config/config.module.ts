/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { env } from 'process';

import { Config } from './entity/config.entity';

@Global()
@Module({})
export class ConfigModule {
    static forRoot(): DynamicModule {
        if (!env['ENV_SETUP']) {
            const localEnvPath = resolve(__dirname, '../../.env.local');
            Logger.warn('overriding environment', { localEnvPath });
            dotenv.config({ path: localEnvPath });
        }

        return {
            exports: [Config],
            global: true,
            module: ConfigModule,
            providers: [
                {
                    provide: Config,
                    useFactory: () => {
                        const environment = env['ENV'] ?? '';
                        if (!ConfigModule.validateEnv(environment)) {
                            ConfigModule.throwValidationError('ENV', environment);
                        }

                        const port = parseInt(env['PORT'] ?? '', 10);
                        if (!ConfigModule.validatePort(port)) {
                            ConfigModule.throwValidationError('PORT', port);
                        }

                        const mongoUri = env['MONGO_URI'] ?? '';
                        if (!ConfigModule.validateMongoUri(mongoUri)) {
                            ConfigModule.throwValidationError('MONGO_URI', mongoUri);
                        }

                        const config = new Config();
                        config.env = environment;
                        config.port = port;
                        config.mongoUri = mongoUri;

                        Logger.log('config initialized', { config });
                        return config;
                    },
                },
            ],
        };
    }

    static validatePort(input: unknown): input is number {
        let port: number;

        if (typeof input === 'string') {
            port = parseInt(input, 10);
        } else if (typeof input === 'number') {
            port = input;
        } else {
            return false;
        }

        if (isNaN(port) || !isFinite(port)) {
            return false;
        }

        if (port < 1 || port > 65535) {
            return false;
        }

        return true;
    }

    static validateMongoUri(mongoUri: unknown): mongoUri is string {
        if (typeof mongoUri !== 'string') {
            return false;
        }

        let url: URL;

        try {
            url = new URL(mongoUri);
        } catch {
            return false;
        }

        if (url.protocol !== 'mongodb:') {
            return false;
        }

        return true;
    }

    static validateEnv(env: unknown): env is 'dev' | 'prod' {
        if (typeof env !== 'string') {
            return false;
        }

        return ['dev', 'prod'].includes(env);
    }

    static throwValidationError(varName: string, value?: string | undefined): never {
        throw new Error(`value '${value}' is invalid for environment variable '${varName}'`);
    }
}
