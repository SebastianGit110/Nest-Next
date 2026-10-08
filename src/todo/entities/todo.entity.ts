import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos') // todos
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  age: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // sqlite no soporta timestamp entonces usar datetime
  // @Column({ type: 'text', default: "datetime('now')" }) // No funciona
  date: Date;
}
