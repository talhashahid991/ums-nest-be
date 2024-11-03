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
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'user_log_history' })
export class UserLogHistory {
  @PrimaryGeneratedColumn({ name: 'user_log_history_id' })
  userLogHistoryId: number;

  @Column({ name: 'user_log_id' })
  userLogId: number;

  @ManyToOne(() => User, (lov) => lov.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  userId?: number;

  @Column({ type: 'timestamptz', name: 'created_at', nullable: true })
  createdAt?: string;

  @Column({ type: 'timestamptz', name: 'updated_at', nullable: true })
  updatedAt?: string;

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
