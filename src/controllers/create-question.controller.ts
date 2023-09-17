import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { z } from 'zod';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { PrismaService } from '../prisma/prisma.service';

const questionBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

type IQuestionBodySchema = z.infer<typeof questionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
	constructor(private prisma: PrismaService) {}

	@Post()
	async handle(@Body() body: IQuestionBodySchema) {
		return 'ok';
	}
}
