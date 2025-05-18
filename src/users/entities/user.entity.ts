import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Si no le ponemos nada, automaticamente asigna el nombre de la tabla en plural
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // El tipo de dato se asigna segun el tipo de dato para ts
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}
