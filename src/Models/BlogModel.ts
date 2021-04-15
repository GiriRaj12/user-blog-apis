import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BlogModel {

    @PrimaryGeneratedColumn()
    private id: string;

    @Column()
    private date: string;

    @Column()
    private arcticleTitle: string;

    @Column()
    private articleBody: string


    setDate(date): void {
        this.checkNullCondition(date, 'Date');
        this.date = date;
    }

    setArticleTitle(title): void {
        this.checkNullCondition(title, 'Title');
        this.arcticleTitle = title;
    }

    setArticleBody(body): void {
        this.checkNullCondition(body, 'Article Body');
        this.articleBody = body;
    }


    private checkNullCondition(value, type): void {
        if (!value) {
            throw new Error(`${type} cannot be null or empty`);
        }
    }

}