import { DocumentBuilder } from '@nestjs/swagger';


export const swaggerConfiguration = new DocumentBuilder()
	.setTitle('Les Marchés Déconfinés')
	.setDescription('A NestJs REST API.')
	.setVersion('1.0')
	.addBearerAuth()
	.build();
