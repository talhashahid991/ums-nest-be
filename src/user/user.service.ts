import { Injectable } from '@nestjs/common';
import { RegisterDataPayloadDto } from './dto/register.dto';
import {
  EMAIL_IN_USE,
  INVALID_CREDENTIALS,
  LC_VERIFIED,
  LID_CREATED_ID,
  LID_DELETE_ID,
  LID_SUBSCRIBER_ID,
  LID_VERIFIED_ID,
  UNVERIFIED_EMAIL,
  USERNAME_IN_USE,
} from 'src/utils/constants';
import { formatDate } from 'src/utils/commonFunctions';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserHistory } from './entities/user-history.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDataPayloadDto } from './dto/login.dto';
import { RestResponse } from 'src/utils/restResponse';
import { UserLogService } from 'src/user-log/user-log.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly mainRepository: Repository<User>,
    @InjectRepository(UserHistory)
    private readonly historyRepositry: Repository<UserHistory>,
    private jwtService: JwtService,
    private userLogService: UserLogService,
  ) {}

  // user registration
  async register(params: RegisterDataPayloadDto) {
    // clean the values
    params.lovUserTypeId = LID_SUBSCRIBER_ID;
    params.lovEmailVerificationTypeId = LID_VERIFIED_ID;
    params.lovGenderTypeId = params?.lovGenderTypeId;
    params.packageId = params?.packageId;
    params.email = params?.email;
    params.firstName = params?.firstName;
    params.middleName = params?.middleName;
    params.lastName = params?.lastName;
    params.profileImage = params?.profileImage;
    params.username = params?.username;
    params.password = params?.password;
    params.createdAt = formatDate();
    params.dmlStatus = LID_CREATED_ID;
    params.dmlTimestamp = formatDate();

    // check if email already in use
    const isEmailInUse = await this.checkEmail(params.email);
    if (isEmailInUse) {
      return RestResponse.error(EMAIL_IN_USE);
    }

    // check is username already in use
    const isUsernameInUse = await this.checkUsername(params.username);
    if (isUsernameInUse) {
      return RestResponse.error(USERNAME_IN_USE);
    }

    // hash the password
    params.password = await bcrypt.hash(params.password, process.env.SALT_KEY);

    // add user to db
    const res = await this.mainRepository.save({ ...params });
    // add user to history db
    await this.historyRepositry.save({ ...res });

    if (res) {
      delete res.password;
      return [res];
    } else {
      // If creation fails, throw an error.
      return RestResponse.error('Please try again later');
    }
  }

  // user creation by admin
  create(createUserDto: RegisterDataPayloadDto) {
    return 'This action adds a new user';
  }

  // login
  async login(params: LoginDataPayloadDto) {
    let user = await this.checkEmail(params.email);
    if (!user) {
      user = await this.checkUsername(params.email);
    }
    if (!user) {
      return RestResponse.notFound(params, INVALID_CREDENTIALS);
    }
    if (user.lovEmailVerificationTypeId !== LID_VERIFIED_ID) {
      // send verification email
      return RestResponse.notFound(params, UNVERIFIED_EMAIL);
    }
    const verifiedUser = await this.checkPassword(
      params.password,
      user['password'],
    );
    if (!verifiedUser) {
      return RestResponse.notFound(params, INVALID_CREDENTIALS);
    }
    delete user['password'];
    return await this.validateUser(user, params);
    // let token = await this.generateToken(user);
    // return [[{ user, token }]];
  }

  // find all users
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // checks if email exist
  async checkEmail(email) {
    const result = await this.mainRepository.findOne({
      where: {
        email: email,
        dmlStatus: Not(LID_DELETE_ID),
      },
    });
    return result;
  }

  // checks if username exist
  async checkUsername(username) {
    console.log(username);
    const result = await this.mainRepository.findOne({
      where: {
        username: username,
        dmlStatus: Not(LID_DELETE_ID),
      },
    });
    return result;
  }

  // checks if password matches
  async checkPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  // generates token
  async generateToken(data) {
    const temToken = await this.jwtService.signAsync(
      {
        ...data,
      },
      {
        secret: process.env.JWT_CONSTANT,
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
    );
    return temToken;
  }

  // validate user
  async validateUser(user, params) {
    // check if user's email is verified
    if (
      user?.lovEmailVerificationTypeId === LID_VERIFIED_ID &&
      user?.emailVerificationTimestamp
    ) {
      // generate token
      let token = await this.generateToken(user);
      // create response object
      let response = {
        case: LC_VERIFIED,
        user,
        token,
      };

      // create user-log record
      await this.userLogService.create({
        userId: user.userId,
        createdAt: formatDate(),
        dmlUserId: user.userId,
        dmlStatus: LID_CREATED_ID,
        dmlTimestamp: formatDate(),
      });
      return [response];
    } else {
      return RestResponse.notFound(params, UNVERIFIED_EMAIL);
    }
  }
}
