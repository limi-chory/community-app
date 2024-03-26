import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정을 위한 옵션
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API Description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  // Swagger 문서를 생성하고 설정한 옵션을 적용
  const document = SwaggerModule.createDocument(app, options);

  // 생성된 Swagger 문서를 /api 경로에 노출
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}
bootstrap();
