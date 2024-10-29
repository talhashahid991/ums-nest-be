// import { LovCategory } from 'src/lov-category/entities/lov-category.entity';
import { LovCategory } from 'src/lov-category/entities/lov-category.entity';
import { User } from 'src/user/entities/user.entity';
import { LID_ACTIVE_ID, LID_CREATED_ID } from 'src/utils/constants';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'list_of_values' })
export class ListOfValues {
  @PrimaryGeneratedColumn({ name: 'list_of_values_id' })
  listOfValuesId: number;

  @ManyToOne(() => LovCategory, (LovCategory) => LovCategory.lovCategoryId)
  @JoinColumn({ name: 'lov_category_id' })
  @Column({ name: 'lov_category_id' })
  lovCategoryId: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'sequence_no', nullable: true })
  sequenceNo: number;

  @Column({ name: 'css_classes', nullable: true })
  cssClasses: string;

  @Column({ name: 'css_severity', nullable: true })
  cssSeverity: string;

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
