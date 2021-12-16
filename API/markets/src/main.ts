import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerConfiguration } from './config/swagger/swaggerConfiguration';


async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const document = SwaggerModule.createDocument(app, swaggerConfiguration);

	SwaggerModule.setup('/', app, document);

	await app.listen(process.env.PORT || 3000);
}


bootstrap();
