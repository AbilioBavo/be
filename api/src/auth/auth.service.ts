import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcrypt';
import { AccountStatus } from '../generated/prisma/enums';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService} from '@nestjs/jwt';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-Password.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { MailService } from 'src/mail/mail.service';
import { CreateSupplierProfileDto } from './dto/create-supplier.dto';
import { SupplierProfile } from '../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  async create(createAuthDto: RegisterDto) {
    const { email, password, phone, role } = createAuthDto;
    const passwordHash = await bcrypt.hash(password, 10);
    const userStatus = AccountStatus.INACTIVE;
    const otp = crypto.randomInt(100000, 999999).toString();
    try {
      const user = await prisma.user.create({
        data: {
          email,
          phone,
          role,
          status: userStatus,
          otpSecret: otp, // Guarda o OTP para verificação futura
          passwordHash,
        },
      });
      // or PENDING if you add it back later like a sane system
      const { passwordHash: _, ...result} = user;
      //TODO : send email with OTP: "O seu código de verificação é: 123456"
      const otpCode = await this.mailService.sendWelcomeEmail(email, otp);
      //console.log('otpCode object: ', otpCode);
      return result;
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new ConflictException('Email already exists');
      } else {
        throw error; // rethrow other errors
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ConflictException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      token: access_token,
    };
  }
  async verifyAccount(VerifyAccountDto: VerifyAccountDto) {
    const { email, otp } = VerifyAccountDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.otpSecret !== otp) {
      throw new UnauthorizedException('Código inválido ou expirado.');
    }
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        status: AccountStatus.ACTIVE,
        otpSecret: null, // Limpa o código após o uso por segurança
      },
    });
    return { message: 'Conta verificada com sucesso!' };
  }
  async refreshToken(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      token: access_token,
      // Opcional: Gerar um novo refresh_token também (rotação de tokens)
    };
  }
  async resetPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      // Gera um código de 6 dígitos
      const otp = crypto.randomInt(100000, 999999).toString();
      // Guardamos o OTP no campo otpSecret (podes expirar em 10-15 min) TODO
      await this.prisma.user.update({
        where: { id: user.id },
        data: { otpSecret: otp },
      });
      console.log(`OTP para ${email}: ${otp}`);
      const otpCode = await this.mailService.sendWelcomeEmail(email, otp);
      console.log('otpCode object: ', otpCode);
      return {
        message: 'Enviámos um código de 6 dígitos para o seu email.',
      };
    } else {
      // Para segurança, não revelamos se o email existe ou não
      return {
        message: 'Se o email existir, enviámos um código de 6 dígitos.',
      };
    }
  }
  async confirmResetPassword(ResetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword } = ResetPasswordDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Verifica se o utilizador existe e se o código coincide
    if (!user || user.otpSecret !== otp) {
      throw new UnauthorizedException('Código inválido ou expirado.');
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        otpSecret: null, // Limpa o código após o uso por segurança
      },
    });

    return { message: 'Password atualizada com sucesso!' };
  }
  async createSupplierProfile(userId: string, dto: CreateSupplierProfileDto) {
    const { companyName, nuit, location, deliveryRadiusKm, bankAccountRef, commissionRate } = dto;
    //TODO: validate location format "POINT(lon lat)" if using Unsupported("point")
    //console.log('Creating supplier profile with data: ', { userId, companyName, nuit, location, deliveryRadiusKm, bankAccountRef, commissionRate });
    const SupplierProfile = await this.prisma.supplierProfile.create({
      data: {
        userId,
        companyName,
        nuit,
        //location,
        deliveryRadiusKm,
        bankAccountRef,
        commissionRate,
      },
    });
    return { message: `Perfil do fornecedor criado com sucesso! Nome: ${SupplierProfile.companyName}`, status: 'success' };
  }
/*  async createDriverProfile(userId: string, dto: CreateSupplierProfileDto) {
    const { companyName, nuit, location, deliveryRadiusKm, bankAccountRef, commissionRate } = dto;
    return this.prisma.driverProfile.create({
      data: {
        userId,
        companyName,
        nuit,
        location,
        deliveryRadiusKm,
        bankAccountRef,
        commissionRate,
      },
    });
  }*/
}
