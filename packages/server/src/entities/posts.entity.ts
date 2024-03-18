import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	title: string;
	@Column()
	contents: string;
	// author: {
	// 	id: Number;
	// 	nickname: String;
	// 	...
	// };
	// createdAt: DateTime;
	// updatedAt: DateTime;
}