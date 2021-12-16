import { Module } from '@nestjs/common';
import { MarketVendorsController } from './marketVendors.controller';
import { MarketVendorsService } from './marketVendors.service';
import { marketVendorsProviders } from './marketVendors.providers';


@Module({
	controllers: [MarketVendorsController],
	providers: [MarketVendorsService, ...marketVendorsProviders],
	exports: [MarketVendorsService]
})


export class MarketVendorsModule {}
