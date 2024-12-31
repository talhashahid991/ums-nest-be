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
import { ListOfValues } from 'src/list-of-values/entities/list-of-values.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { Email } from './email.entity';

@Entity({ name: 'email_history' })
export class EmailHistory {
  @PrimaryGeneratedColumn({ name: 'email_history_id' })
  emailHistoryId: number;

  @ManyToOne(() => Email, (x) => x.emailId)
  @JoinColumn({ name: 'email_id' })
  @Column({
    name: 'email_id',
    nullable: true,
  })
  emailId: number;

  @ManyToOne(() => User, (x) => x.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({
    name: 'user_id',
    nullable: true,
  })
  userId: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ type: 'timestamptz', name: 'created_at', nullable: true })
  createdAt?: string;

  // dml

  @ManyToOne(() => ListOfValues, (lov) => lov.listOfValuesId)
  @JoinColumn({ name: 'dml_status' })
  @Column({
    name: 'dml_status',
    nullable: true,
    default: LID_CREATED_ID,
  })
  dmlStatus?: number;

  @ManyToOne(() => User, (lov) => lov.userId)
  @JoinColumn({ name: 'dml_user_id' })
  @Column({ name: 'dml_user_id', nullable: true })
  dmlUserId?: number;

  @Column({ name: 'dml_timestamp', type: 'timestamptz', nullable: true })
  dmlTimestamp?: string;
}

export const jsonSchemas = validationMetadatasToSchemas();
