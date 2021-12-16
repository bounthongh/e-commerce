import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';


@Controller('auth')
@ApiTags('Authentication')
export class AuthController
{

	constructor(private readonly authService: AuthService) {}


	@Post('/login')
	@UseGuards(LocalAuthGuard)
	async login(@Body() authDto: AuthDto, @Request() request)
	{
		return this.authService.login(request.user);
	}
}
