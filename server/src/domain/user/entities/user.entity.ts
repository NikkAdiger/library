import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserStatus } from '../types/enums';

@Entity('user')
export class UserEntity {
	@PrimaryColumn({ type: 'varchar', default: uuid() })
	id: string;

	@Column({ type: 'varchar', name: 'first_name', nullable: true })
	firstName: string;

	@Column({ type: 'varchar', name: 'last_name', nullable: true })
	lastName: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar', default: 'user' })
	role: string;

	@Column({ type: 'varchar', unique: true })
	email: string;

	@Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE, nullable: true })
	status: UserStatus;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
