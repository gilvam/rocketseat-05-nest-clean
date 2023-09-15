import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const authenticateBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

type IAuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
	constructor(
		private jwt: JwtService,
		private prisma: PrismaService,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(authenticateBodySchema))
	async handle(@Body() body: IAuthenticateBodySchema) {
		const { email, password } = body;

		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw new UnauthorizedException('User credentials do not match.');
		}

		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('User credentials do not match.');
		}

		const accessToken = this.jwt.sign({ sub: user.id });

		return {
			accessToken,
		};
	}
}
