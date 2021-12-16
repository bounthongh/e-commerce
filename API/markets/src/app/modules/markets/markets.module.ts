import { Module } from '@nestjs/common';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { marketsProviders } from './markets.providers';


@Module({
	controllers: [MarketsController],
	providers: [MarketsService, ...marketsProviders],
})


export class MarketsModule {}
