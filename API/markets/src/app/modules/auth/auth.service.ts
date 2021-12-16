import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService
{

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}


	async validateUser(email: string, passwd: string): Promise<any>
	{
		const user = await this.usersService.findOneByLogin(email);

		if (user && bcrypt.compareSync(passwd, user.USR_PASSWORD))
		{
			const { USR_PASSWORD, ...result } = user;
			return result;
		}

		return null;
	}


	async login(user: any)
	{
		const isVendor = user.dataValues.VENDOR !== null;
		const isCustomer = user.dataValues.CUSTOMER !== null;

		const payload = {
			username: user.dataValues.USR_LOGIN,
			sub: user.dataValues.USR_ID,
			isAdmin: user.dataValues.USR_IS_ADMIN,
			isVendor: isVendor,
			isCustomer: isCustomer,
			vendorId: isVendor ? user.dataValues.VENDOR.dataValues.VDR_ID : null,
			customerId: isCustomer ? user.dataValues.CUSTOMER.dataValues.CUS_ID : null,
		};

		const { USR_PASSWORD, ...userToReturn } = user.dataValues;

		return {
			access_token: this.jwtService.sign(payload),
			user: userToReturn
		};
	}
}
