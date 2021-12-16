import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { users_usr } from './users.entity';


@Controller('users')
@ApiTags('Users')
export class UsersController
{

	constructor(
		private readonly usersService: UsersService,
	) {}


	@Post()
	async create(@Body() createUserDto: CreateUserDto)
	{
		await this.usersService.create(createUserDto);
	}


	@Get()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<users_usr[]>
	{
		return await this.usersService.findAll();
	}


	@Get(':id')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<users_usr>
	{
		return await this.usersService.findOne(+id);
	}


	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async deleteOne(@Param('id') id: string): Promise<any>
	{
		await this.usersService.deleteOne(+id);
	}


	@Put()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async update(@Body() updateUsersDto: UpdateUserDto)
	{
		return await this.usersService.update(updateUsersDto);
	}
}
