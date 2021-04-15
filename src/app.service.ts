import { Injectable } from '@nestjs/common';
import { User } from './Models/UserModel'
import * as moment from 'moment';
import { DBServices } from './DBService/DBService';

@Injectable()
export class UserService {
  async addUser(body): Promise<string> {
    try {
      checkInitialConditions(body);
      const user = addInitialValues(body);
      const dbServices = new DBServices();
      return JSON.stringify(await dbServices.createUser(user));
    } catch (error) {
      return JSON.stringify({ 'response': false, 'message': error.message });
    }
  }
}

function addInitialValues(body): User {
  const user = new User();
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