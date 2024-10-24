import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  LID_SUBSCRIBER_ID,
  LID_NOT_VERIFIED_ID,
  LID_CREATED_ID,
  LID_ACTIVE_ID,
} from 'src/utils/constants';
import { User } from './user.entity';

@Entity({ name: 'user_history' })
export class UserHistory {
  @PrimaryGeneratedColumn({ name: 'user_history_id' })
  @IsOptional()
  @IsNumber()
  userHistoryId?: number;

  @Column({ name: 'user_id' })
  @IsOptional()
  @IsNumber()
  userId: number;

  @Column({ name: 'email', nullable: false })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column({ name: 'first_name', nullable: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({ name: 'middle_name', nullable: true })
  @IsString()
  @IsOptional()
  middleName: string;

  @Column({ name: 'last_name', nullable: false })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ name: 'profile_image', nullable: true })
  @IsString()
  @IsOptional()
  profileImage: string;

  @Column({ type: 'varchar', name: 'username', nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ type: 'date', name: 'date_of_birth', nullable: true })
  @IsString()
  @IsOptional()
  dateOfBirth: string;

  // @ManyToOne(() => ListOfValues, (x) => x.listOfValuesId)
  // @JoinColumn({ name: 'lov_user_type_id' })
  @Column({
    name: 'lov_user_type_id',
    nullable: true,
    default: LID_SUBSCRIBER_ID,
  })
  @IsNumber()
  @IsOptional()
  lovUserTypeId: number;

  // @ManyToOne(() => ListOfValues, (x) => x.listOfValuesId)
  // @JoinColumn({ name: 'lov_email_verification_type_id' })
  @Column({
    nullable: true,
    name: 'lov_email_verification_type_id',
    default: LID_NOT_VERIFIED_ID,
  })
  @IsOptional()
  @IsNumber()
  lovEmailVerificationTypeId: number;

  @Column({
    nullable: true,
    type: 'timestamptz',
    name: 'email_verification_timestamp',
  })
  @IsOptional()
  @IsString()
  emailVerificationTimestamp?: string;

  // @ManyToOne(() => ListOfValues, (x) => x.listOfValuesId)
  // @JoinColumn({ name: 'lov_gender_type_id' })
  @Column({ nullable: true, name: 'lov_gender_type_id' })
  @IsOptional()
  @IsNumber()
  lovGenderTypeId: number;

  // @ManyToOne(() => Package, (x) => x.packageId)
  // @JoinColumn({ name: 'package_id' })
  @Column({ nullable: true, name: 'package_id' })
  @IsOptional()
  @IsNumber()
  packageId: string;

  @Column({ type: 'timestamptz', name: 'created_at', nullable: true })
  @IsOptional()
  @IsString()
  createdAt: string;

  @Column({ type: 'timestamptz', name: 'updated_at', nullable: true })
  @IsOptional()
  @IsString()
  updatedAt: string;

  // @ManyToOne(() => ListOfValues, (x) => x.listOfValuesId)
  // @JoinColumn({ name: 'lov_status_id' })
  @Column({ name: 'lov_status_id', nullable: false, default: LID_ACTIVE_ID })
  @IsOptional()
  @IsNumber()
  lovStatusId: number;

  // dml

  // @ManyToOne(() => ListOfValues, (lov) => lov.listOfValuesId)
  // @JoinColumn({ name: 'dml_status' })
  @Column({
    name: 'dml_status',
    nullable: true,
    default: LID_CREATED_ID,
  })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @ManyToOne(() => User, (lov) => lov.userId)
  @JoinColumn({ name: 'dml_user_id' })
  @Column({ name: 'dml_user_id', nullable: true })
  dmlUserId: number;

  @Column({ name: 'dml_timestamp', type: 'timestamptz', nullable: true })
  dmlTimestamp: string;
}

export const jsonSchemas = validationMetadatasToSchemas();
