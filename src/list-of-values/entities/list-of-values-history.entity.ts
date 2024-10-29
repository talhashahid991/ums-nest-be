import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ListOfValues } from './list-of-values.entity';

@Entity({ name: 'list_of_values_history' })
export class ListOfValuesHistory {
  @PrimaryGeneratedColumn({ name: 'list_of_values_history_id' })
  listOfValuesHistoryId: number;

  @Column({ name: 'list_of_values_id' })
  listOfValuesId: number;

  @Column({ name: 'lov_category_id', nullable: true })
  lovCategoryId: number;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'sequence_no', nullable: true })
  sequenceNo: number;

  @Column({ name: 'css_classes', nullable: true })
  cssClasses: string;

  @Column({ name: 'css_severity', nullable: true })
  cssSeverity: string;

  @Column({
    name: 'lov_status_id',
    nullable: true,
  })
  lovStatusId: number;

  // dml

  @ManyToOne(() => ListOfValues, (lov) => lov.listOfValuesId)
  @JoinColumn({ name: 'dml_status' })
  @Column({
    name: 'dml_status',
    nullable: true,
  })
  dmlStatus?: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'dml_user_id' })
  @Column({ name: 'dml_user_id', nullable: true })
  dmlUserId: number;

  @Column({ name: 'dml_timestamp', type: 'timestamptz', nullable: true })
  dmlTimestamp: Date;
}
