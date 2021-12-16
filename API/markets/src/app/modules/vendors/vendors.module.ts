import { vendorsProviders } from './vendors.providers';
import { VendorsService } from './vendors.service';
import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';

@Module({
	controllers: [VendorsController],
	providers: [VendorsService, ...vendorsProviders],
	exports: [VendorsService]
})

export class VendorsModule {}
