import { ApiProperty } from "@nestjs/swagger"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
  @Column()
  banReason: string
  @Column()
  @ApiProperty({ example: "true" })
  isBanned: boolean
}
