import { ApiProperty } from "@nestjs/swagger"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Role {
  @ApiProperty({ example: "1" })
  @PrimaryGeneratedColumn()
  id: number
  @ApiProperty({ example: "admin" })
  @Column({ unique: true })
  value: string
  @ApiProperty({ example: "admin", description: "role description" })
  @Column()
  description: string
  @OneToMany(() => User, user => user.role)
  users: User[]
}
