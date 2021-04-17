import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    private id: string;

    @Column()
    private updated_date: string;

    @Column()
    private title: string;

    @Column()
    private body: string


    setDate(date): void {
        this.checkNullCondition(date, 'Date');
        this.updated_date = date;
    }

    setArticleTitle(title): void {
        this.checkNullCondition(title, 'Title');
        this.title = title;
    }

    setArticleBody(body): void {
        this.checkNullCondition(body, 'Article Body');
        this.body = body;
    }


    private checkNullCondition(value, type): void {
        if (!value) {
            throw new Error(`${type} cannot be null or empty`);
        }
    }

}