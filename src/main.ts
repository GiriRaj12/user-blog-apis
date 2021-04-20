import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminConfig: ServiceAccount = {
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL
  };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
