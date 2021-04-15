import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({
        length: 100
    })
    private name: string;

    @Column()
    private dob: string;

    @Column()
    private metadata: string;

    @Column()
    private isActive: boolean = true;

    setName(name): void {
        this.checkNullCondition(name, 'Name');
        this.name = name;
    }

    setDob(dob): void {
        this.checkNullCondition(dob, 'Date of Birth');
        this.dob = dob;
    }

    setMetadata(metadata): void {
        this.metadata = metadata;
    }

    setIsActive(value): void {
        if (!value) {
            this.isActive = true;
        }
    }

    private checkNullCondition(value, type): void {
        if (!value) {
            throw new Error(`${type} cannot be null or empty`);
        }
    }
}