import { dropoffsProviders } from './dropoffs.providers';
import { DropoffsService } from './dropoffs.service';
import { Module } from '@nestjs/common';
import { DropoffsController } from './dropoffs.controller';


@Module({
	controllers: [DropoffsController],
	providers: [DropoffsService, ...dropoffsProviders],
	exports: [DropoffsService]
})


export class DropoffsModule {}
