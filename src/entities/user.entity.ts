import { ApiProperty } from "@nestjs/swagger"
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne } from "typeorm"
import { Role } from "./role.entity"

@Entity()
export class User {
  @ApiProperty({ example: "1" })
  @PrimaryGeneratedColumn()
  id: number
  @ApiProperty({ example: "temirlan" })
  @Column({ unique: true })
  username: string
  @ApiProperty({ example: "test12345" })
  @Column()
  password: string
  @ApiProperty({ example: "просто так чтобы не втыкал" })
  @Column({ default: "" })
  banReason: string
  @Column({ default: false })
  @ApiProperty({ example: "true" })
  isBanned: boolean
  @ManyToOne(() => Role, { cascade: true })
  @JoinTable()
  role: Role
}
