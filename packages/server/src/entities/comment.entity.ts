import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    contents: String;
    //    author: {
    //        ...
    //    };

    @Column()
    isDeleted: Boolean;
    //    createdAt: DateTime;
    //    updatedAt: DateTime;
}