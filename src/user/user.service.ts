import { User } from 'src/user/entities/user.entity';
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
  RECORD_EXISTS,
  TRY_AGAIN_LATER,
  UNVERIFIED_EMAIL,
  USERNAME_IN_USE,
} from 'src/utils/constants';
import { formatDate } from 'src/utils/commonFunctions';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserHistory } from './entities/user-history.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDataPayloadDto } from './dto/login.dto';
import { RestResponse } from 'src/utils/restResponse';
import { UserLogService } from 'src/user-log/user-log.service';
import { FindAllDataPayloadDto } from './dto/find-all.dto';
import { paginationDto } from 'src/utils/commonDtos.dto';
import { isEmpty, isNumber } from 'lodash';
import { CreateDataPayloadDto } from './dto/create.dto';

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

  // user creation by admin
  async create(params: CreateDataPayloadDto) {
    // check if record exists
    const ifRecordExists = await this.mainRepository.findOne({
      where: [
        {
          username: params.username,
          email: params.email,
          dmlStatus: Not(LID_DELETE_ID),
        },
      ],
    });
    if (ifRecordExists) {
      return RestResponse.notFound(params, RECORD_EXISTS);
    }
    // create a new record
    const res = await this.mainRepository.save({ ...params });
    // create history record
    await this.historyRepositry.save({ ...res });
    if (res) {
      return [res];
    } else {
      // If creation fails, throw a BadRequestException.
      return RestResponse.error(params, TRY_AGAIN_LATER);
    }
  }

  async findAll(params: FindAllDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    // Construct SQL query based on provided filter parameters.
    if (isNumber(params?.userId)) {
      sql += `r.userId=${params?.userId} AND `;
    }
    if (!isEmpty(params?.email)) {
      sql += `r.email ilike '%${params?.email}%' AND `;
    }
    if (!isEmpty(params?.firstName)) {
      sql += `r.firstName ilike '%${params?.firstName}%' AND `;
    }
    if (!isEmpty(params?.middleName)) {
      sql += `r.middleName ilike '%${params?.middleName}%' AND `;
    }
    if (!isEmpty(params?.lastName)) {
      sql += `r.lastName ilike '%${params?.lastName}%' AND `;
    }
    if (!isEmpty(params?.profileImage)) {
      sql += `r.profileImage ilike '%${params?.profileImage}%' AND `;
    }
    if (!isEmpty(params?.username)) {
      sql += `r.username ilike '%${params?.username}%' AND `;
    }
    if (!isEmpty(params?.dateOfBirth)) {
      sql += `r.dateOfBirth ilike '%${params?.dateOfBirth}%' AND `;
    }
    if (!isEmpty(params?.lovGenderTypeId)) {
      sql += `r.lovGenderTypeId=${params?.lovGenderTypeId} AND `;
    }
    if (!isEmpty(params?.lovUserTypeId)) {
      sql += `r.lovUserTypeId=${params?.lovUserTypeId} AND `;
    }
    if (!isEmpty(params?.lovEmailVerificationTypeId)) {
      sql += `r.lovEmailVerificationTypeId=${params?.lovEmailVerificationTypeId} AND `;
    }
    if (!isEmpty(params?.organizationId)) {
      sql += `r.organizationId=${params?.organizationId} AND `;
    }
    if (!isEmpty(params?.packageId)) {
      sql += `r.packageId=${params?.packageId} AND `;
    }
    if (!isEmpty(params?.lovEmailVerificationTypeId)) {
      sql += `r.lovEmailVerificationTypeId=${params?.lovEmailVerificationTypeId} AND `;
    }
    if (!isEmpty(params?.createdAt)) {
      sql += `r.createdAt ilike '%${params?.createdAt}%' AND `;
    }

    sql += `r.dmlStatus != ${LID_DELETE_ID} ORDER BY 1 DESC`;

    // Count the total number of records based on the constructed SQL query.
    const count = await this.mainRepository
      .createQueryBuilder('r')
      .where(sql)
      .getCount();
    // Apply pagination if provided and return the filtered and paginated records.
    if (
      !isEmpty(pagination) &&
      pagination?.pageNo >= 0 &&
      pagination?.itemsPerPage > 0
    ) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = count
      ? await this.mainRepository
          .createQueryBuilder('r')
          .where(sql)
          .leftJoinAndSelect('r.lovStatusId', 'lovStatusId')
          .leftJoinAndSelect('r.lovUserTypeId', 'lovUserTypeId')
          .getMany()
      : [];
    return count ? [query, count] : [];
  }

  // async findOne(params: FindOneDataPayloadDto) {
  //   const res = await this.mainRepository.findOne({
  //     where: {
  //       listOfValuesId: params?.listOfValuesId,
  //       dmlStatus: Not(LID_DELETE_ID),
  //     },
  //   });

  //   return res;
  // }

  // async update(params: UpdateDataPayloadDto) {
  //   // check if record exists
  //   const ifRecordExists = await this.mainRepository.findOne({
  //     where: [
  //       {
  //         title: params.title,
  //         dmlStatus: Not(LID_DELETE_ID),
  //         lovCategoryId: params.lovCategoryId,
  //         listOfValuesId: Not(params.listOfValuesId),
  //       },
  //     ],
  //   });

  //   if (ifRecordExists) {
  //     return RestResponse.error(params, RECORD_EXISTS);
  //   }

  //   const obj = await this.findOne({
  //     listOfValuesId: params.listOfValuesId,
  //   });

  //   // If the record to update does not exist, throw a NotFoundException.
  //   if (!obj) {
  //     return RestResponse.notFound(params);
  //   }

  //   const res = await this.mainRepository.save({
  //     ...params,
  //   });
  //   await this.historyRepositry.save({ ...res });
  //   if (!res) {
  //     return [res];
  //   } else {
  //     // If creation fails, throw a BadRequestException.
  //     return RestResponse.error(params, TRY_AGAIN_LATER);
  //   }
  // }

  // async delete(params: DeleteDataPayloadDto) {
  //   const obj = await this.findOne({
  //     listOfValuesId: params.listOfValuesId,
  //   });

  //   // If the record to update does not exist, throw a NotFoundException.
  //   if (!obj) {
  //     return RestResponse.notFound(params);
  //   }
  //   obj.dmlStatus = params['dmlStatus'];
  //   obj.dmlTimestamp = params['dmlTimestamp'];
  //   const res = await this.mainRepository.save({
  //     ...obj,
  //   });
  //   await this.historyRepositry.save({ ...res });
  //   if (res) {
  //     return [res];
  //   } else {
  //     // If creation fails, throw a BadRequestException.
  //     return RestResponse.error(params, TRY_AGAIN_LATER);
  //   }
  // }

  // checks if email exist
  async checkEmail(email) {
    // const result = await this.mainRepository.findOne({
    //   where: {
    //     email: email,
    //     dmlStatus: Not(LID_DELETE_ID),
    //   },
    // });
    const sql = `r.email = '${email}' AND r.dmlStatus != ${LID_DELETE_ID} ORDER BY 1 DESC`;
    const result = await this.mainRepository
      .createQueryBuilder('r')
      .where(sql)
      .addSelect('r.password')
      .leftJoinAndSelect('r.lovStatusId', 'lovStatusId')
      .leftJoinAndSelect('r.lovUserTypeId', 'lovUserTypeId')
      .getOne();
    return result;
  }

  // checks if username exist
  async checkUsername(username) {
    console.log(username);
    // const result = await this.mainRepository.findOne({
    //   where: {
    //     username: username,
    //     dmlStatus: Not(LID_DELETE_ID),
    //   },
    // });
    const sql = `r.username = '${username}' AND r.dmlStatus != ${LID_DELETE_ID} ORDER BY 1 DESC`;
    const result = await this.mainRepository
      .createQueryBuilder('r')
      .where(sql)
      .addSelect('r.password')
      .leftJoinAndSelect('r.lovStatusId', 'lovStatusId')
      .leftJoinAndSelect('r.lovUserTypeId', 'lovUserTypeId')
      .getOne();
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
