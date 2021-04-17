import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import { firebaseConfig } from './FirebaseConfig/firebaseConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminConfig: ServiceAccount = { ...firebaseConfig };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
