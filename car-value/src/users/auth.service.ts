import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email already in use');
    }
    // hash user passwords
    /// generate the salt
    const salt = randomBytes(8).toString('hex');
    /// hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    /// join the hashed result and the password together
    const result = salt + '.' + hash.toString('hex');
    // create new user and save it

    // return the user
  }

  signin() {}
}
