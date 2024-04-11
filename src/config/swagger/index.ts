import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const defaultDocsPath = '/docs';

export interface SwaggerOptions {
  servers?: string[];
  globalPrefix?: string;
  docsPath?: string;
}

export const setupSwagger = (
  app: INestApplication,
  options?: SwaggerOptions,
) => {
  const config = new DocumentBuilder()
    .setTitle('Bank REST API')
    .setDescription(
      'api rest for bank card, account and transaction processing',
    )
    .setVersion('0.0.1');

  options?.servers?.forEach((s) => config.addServer(s));

  const globalPrefix = options?.globalPrefix || '';
  let docsPath = options?.docsPath || defaultDocsPath;

  if (!docsPath.startsWith('/')) {
    docsPath = '/' + docsPath;
  }

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(`${globalPrefix}${docsPath}`, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });
};
