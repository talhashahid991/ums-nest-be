import { ListOfValues } from 'src/list-of-values/entities/list-of-values.entity';
import { LovCategory } from 'src/lov-category/entities/lov-category.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { LID_ACTIVE_ID, LID_CREATED_ID } from 'src/utils/constants';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'application_history' })
export class ApplicationHistory {
  @PrimaryGeneratedColumn({ name: 'application_history_id' })
  applicationHistoryId: number;

  @Column({ name: 'application_id' })
  applicationId: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => ListOfValues, (Lov) => Lov.listOfValuesId)
  @JoinColumn({ name: 'lov_status_id' })
  @Column({
    name: 'lov_status_id',
    default: LID_ACTIVE_ID,
  })
  lovStatusId: number;

  // dml

  @ManyToOne(() => ListOfValues, (lov) => lov.listOfValuesId)
  @JoinColumn({ name: 'dml_status' })
  @Column({
    name: 'dml_status',
    default: LID_CREATED_ID,
  })
  dmlStatus: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'dml_user_id' })
  @Column({ name: 'dml_user_id' })
  dmlUserId: number;

  @Column({ name: 'dml_timestamp', type: 'timestamptz' })
  dmlTimestamp: Date;
}
