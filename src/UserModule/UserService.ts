import { Injectable } from '@nestjs/common';
import { Users } from '../Models/UserModel';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import firebase from 'firebase';
import { APIResponse } from '../Common/APIResponse';
import { initializeApp } from 'src/Common/InitializeFirebaseApp';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async addUser(body): Promise<object> {
    try {
      checkInitialConditions(body);
      const user = addInitialValues(body);
      const savedUserValue = await this.userRepo.save(user);
      return APIResponse(true, savedUserValue);
    } catch (err) {
      return APIResponse(false, err.message);
    }
  }

  async loginUser(body): Promise<object> {
    try {
      const email = body.email;
      const password = body.password;
      const currentUser = firebase.auth().currentUser;
      if (firebase.apps.length === 0) await initializeApp();

      if (currentUser) {
        console.log('Signing out');
        await firebase.auth().signOut();
      }
      console.log(`Email: ${email}`);
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const tokenResponse = {
        token: await user.user.getIdToken(),
      };
      return APIResponse(true, tokenResponse);
    } catch (err) {
      return APIResponse(false, `Wrong Creds : ${err.message}`);
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
  const momentfunction = moment(body.dob, 'DD/MM/YYYY', true);
  if (!body) {
    throw new Error('User data empty');
  }

  if (!body.name && typeof body.name === 'string' && body.name.length >= 100) {
    throw new Error('User must have a name and shoulb be in a proper format');
  }

  if (!(body.dob && momentfunction.isValid())) {
    throw new Error('User should have dob');
  }
}
