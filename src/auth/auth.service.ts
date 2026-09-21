import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('email atau password salah');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('email atau password salah');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('akun tidak aktif');
    }

    const roles = await this.usersService.findRolesByUserId(user.id);

    const payload = { sub: user.id, email: user.email };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_key',
    });

    return {
      id: user.id,
      nama: user.nama,
      roles,
      access_token,
      refresh_token,
      token_type: 'Bearer',
      expires_in: 900, // 15 menit dalam detik
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_key',
      });

      const user = await this.usersService.findById(payload.sub);

      const newPayload = { sub: user.id, email: user.email };

      const access_token = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
      });

      // kasih juga refresh token baru
      const refresh_token = this.jwtService.sign(newPayload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_key',
      });

      return {
        id: user.id,
        nama: user.nama,
        roles: user.roles,
        access_token,
        refresh_token,
        token_type: 'Bearer',
        expires_in: 900,
      };
    } catch (e) {
      throw new UnauthorizedException('refresh token tidak valid atau sudah kadaluarsa');
    }
  }
}