import { ApplicationRole } from 'src/application-role/entities/application-role.entity';
import { Application } from 'src/application/entities/application.entity';
import { BusinessRole } from 'src/business-role/entities/business-role.entity';
import { ListOfValues } from 'src/list-of-values/entities/list-of-values.entity';
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

@Entity({ name: 'business_application_role' })
export class BusinessApplicationRole {
  @PrimaryGeneratedColumn({ name: 'business_application_role_id' })
  businessApplicationRoleId: number;

  @ManyToOne(() => BusinessRole, (x) => x.businessRoleId)
  @JoinColumn({ name: 'business_role_id' })
  @Column({
    name: 'business_role_id',
  })
  businessRoleId: number;

  @ManyToOne(() => ApplicationRole, (x) => x.applicationRoleId)
  @JoinColumn({ name: 'application_role_id' })
  @Column({
    name: 'application_role_id',
  })
  applicationRoleId: number;

  @ManyToOne(() => Application, (x) => x.applicationId)
  @JoinColumn({ name: 'application_id' })
  @Column({
    name: 'application_id',
  })
  applicationId: number;

  // @ManyToOne(() => ListOfValues, (Lov) => Lov.listOfValuesId)
  // @JoinColumn({ name: 'lov_status_id' })
  // @Column({
  //   name: 'lov_status_id',
  //   default: LID_ACTIVE_ID,
  // })
  // lovStatusId: number;

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
