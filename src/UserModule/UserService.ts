import { Injectable } from '@nestjs/common';
import { Users } from '../Models/UserModel'
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import firebase from 'firebase';
import { firebaseConfig } from '../FirebaseConfig/firebaseConfig';
import * as admin from 'firebase-admin';



@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private userRepo: Repository<Users>) { }

    async addUser(body): Promise<string> {
        try {
            checkInitialConditions(body);
            const user = addInitialValues(body);

            return JSON.stringify(await this.userRepo.save(user));
        } catch (error) {
            return JSON.stringify({ 'response': false, 'message': error.message });
        }
    }

    async loginUser(body): Promise<string> {
        try {
            const email = body.email;
            const password = body.password;
            await firebase.initializeApp({ ...firebaseConfig });
            await firebase.auth().signOut();
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            return JSON.stringify({
                token: await user.user.getIdToken(),
                refreshToken: user.user.refreshToken
            });
        } catch (err) {
            console.log(err.message);
            return 'Invalid User Credentials';
        }
    }
}

function addInitialValues(body): Users {
    const user = new Users();
    user.setDob(body.dob);
    user.setName(body.name);
    user.setMetadata(body.metadata);
    return user;
}


function checkInitialConditions(body): void {
    const momentfunction = moment(body.dob, "DD/MM/YYYY", true);
    if (!body) {
        throw new Error('User data empty');
    }

    if (!body.name && (typeof body.name === 'string' && body.name.length >= 100)) {
        throw new Error('User must have a name and shoulb be in a proper format');
    }

    if (!(body.dob && momentfunction.isValid())) {
        throw new Error('User should have dob');
    }

}