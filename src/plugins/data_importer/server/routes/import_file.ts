/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema, TypeOf } from '@osd/config-schema';
import { FileParserService } from '../parsers/file_parser_service';
import { CSV_SUPPORTED_DELIMITERS } from '../../common/constants';
import { IRouter } from '../../../../core/server';
import { configSchema } from '../../config';
import { decideClient } from '../utils/util';
import { FileStream } from '../types';

export function importFileRoute(
  router: IRouter,
  config: TypeOf<typeof configSchema>,
  fileParsers: FileParserService,
  dataSourceEnabled: boolean
) {
  router.post(
    {
      path: '/api/data_importer/_import_file',
      options: {
        body: {
          maxBytes: config.maxFileSizeBytes,
          accepts: 'multipart/form-data',
          output: 'stream',
        },
      },
      validate: {
        query: schema.object({
          indexName: schema.string({ minLength: 1 }),
          createMode: schema.boolean(),
          fileExtension: schema.string({ minLength: 1 }),
          dataSource: schema.maybe(schema.string()),
          delimiter: schema.maybe(
            schema.string({
              validate(value: string) {
                if (!CSV_SUPPORTED_DELIMITERS.includes(value)) {
                  return `must be a supported delimiter`;
                }
              },
            })
          ),
        }),
        body: schema.object({
          file: schema.stream(),
          mapping: schema.maybe(schema.string({ minLength: 1 })),
        }),
      },
    },
    async (context, request, response) => {
      const fileExtension = request.query.fileExtension.startsWith('.')
        ? request.query.fileExtension.slice(1)
        : request.query.fileExtension;

      const parser = fileParsers.getFileParser(fileExtension);
      if (!parser) {
        return response.badRequest({
          body: `${fileExtension} is not a registered or supported filetype`,
        });
      }

      const client = await decideClient(dataSourceEnabled, context, request.query.dataSource);

      if (!!!client) {
        return response.notFound({
          body: 'Data source is not enabled or does not exist',
        });
      }

      if (!request.query.createMode) {
        try {
          const indexExists = await client.indices.exists({
            index: request.query.indexName,
          });

          if (!indexExists.body) {
            return response.notFound({
              body: `Index ${request.query.indexName} does not exist`,
            });
          }
        } catch (e) {
          return response.internalError({
            body: `Error checking if index exists: ${e}`,
          });
        }
      } else {
        try {
          await client.indices.create({
            index: request.query.indexName,
            body: {
              mappings: JSON.parse(request.body.mapping!),
            },
          });
        } catch (e) {
          return response.internalError({
            body: `Error creating index: ${e}`,
          });
        }
      }

      const file = request.body.file as FileStream;

      try {
        const message = await parser.ingestFile(file, {
          indexName: request.query.indexName,
          client,
          delimiter: request.query.delimiter,
          dataSourceId: request.query.dataSource,
        });

        return response.ok({
          body: {
            message,
            success: true,
          },
        });
      } catch (e) {
        return response.internalError({
          body: `Error ingesting file: ${e}`,
        });
      }
    }
  );
}
