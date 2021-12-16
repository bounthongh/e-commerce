import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate
{

	constructor(private reflector: Reflector) {}


	canActivate(context: ExecutionContext): boolean
	{
		const roles = this.reflector.get<string[]>('roles', context.getClass());
		if (!roles) { return true; }

		const request = context.switchToHttp().getRequest();
		const user = request.user;
		
		const isAuthorized = () => (roles.includes('ADMIN') && user.isAdmin) ||
			(roles.includes('VENDOR') && user.isVendor);

		return user && isAuthorized();
	}
}
