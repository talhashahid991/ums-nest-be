import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegisterDataPayloadDto } from './dto/register.dto';
import {
  LID_CREATED_ID,
  LID_DELETE_ID,
  LID_SUBSCRIBER_ID,
  LID_VERIFIED_ID,
} from 'src/utils/constants';
import { formatDate } from 'src/utils/commonFunctions';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserHistory } from './entities/user-history.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly mainRepository: Repository<User>,
    @InjectRepository(UserHistory)
    private readonly historyRepositry: Repository<UserHistory>,
    // private jwtService: JwtService,
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
    // console.log(isEmailInUse);
    if (isEmailInUse) {
      throw new HttpException('email in use error', HttpStatus.BAD_REQUEST);
    }

    // check is username already in use
    const isUsernameInUse = await this.checkUsername(params.username);
    // console.log(isUsernameInUse);
    if (isUsernameInUse) {
      throw new HttpException('username in use error', HttpStatus.BAD_REQUEST);
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
      // If creation fails, throw a BadRequestException.
      throw new BadRequestException();
    }
  }
  create(createUserDto: RegisterDataPayloadDto) {
    return 'This action adds a new user';
  }

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

  async checkEmail(email) {
    const result = await this.mainRepository.findOne({
      where: {
        email: email,
        dmlStatus: Not(LID_DELETE_ID),
      },
    });
    return result;
  }

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

  async checkPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken(data) {
    // const temToken = await this.jwtService.signAsync(
    //   {
    //     ...data,
    //   },
    //   {
    //     secret: process.env.JWT_CONSTANT,
    //     expiresIn: JWT_EXPIRE_IN,
    //   },
    // );
    // return temToken;
    return {};
  }
}
