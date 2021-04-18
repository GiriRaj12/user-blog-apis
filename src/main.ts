import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import { firebaseConfig } from './FirebaseConfig/firebaseConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminConfig: ServiceAccount = {
    projectId: "user-base-2d152",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWKJkwhjhr8hr8\ngq3UtcgZCEHPWVr8NcKQpgrQ/YWSs+1NRAj19qI2CAbFdPmyC+D8q3YgGSENkvsb\n0TP3xjIYJ10PR3mqGlTQZUYyIlb7gW6n9AfBaFSebd7HdVaVL8m5ffl7QpRYEilQ\nhydhZFVuGOv3+oxpndthM18PgzU74sJ1+ZbF+os/uIKrBgNv6yJr1JgA2LqpUxNK\nxXHsWuDQYAaKjiOE7KM2Qo2ss3pYGGx2NVL3ndX/ODquC/AFfB8LA4c/Rs3+LK69\nWYAK7DXw6QkxyhbCoMgjGtWU2qRXCV1DRg+Lk0TG9BUwP3eGiZh0imueNlYTcrrK\nKz2HaSezAgMBAAECggEAEWcZkh8WFQ+GsEZRdRuTt+HUsNJq2Y8bN6eGixa1WzqF\nahknpHUqSu6HPlYT6sTN8tP4584JW/g5sTgxQbOe/OXiyT8RqYg1cP0J1Nq3HsqV\nAQKMYf1/nHA2AX3AT3DWstzqmeDLLtNeMBqlHjDwQ3lOLS4nz6olDaNspVVDZvfc\nMg5Hs4sSqWAyO63i7il6NVAeYzcvjdbEot9Pvgzy2MDdBup350M3w12bVzsa+ma9\nMX9LYb9aWlXhQ4CAwudINwZkSLuD4C0Om4nkxAagUKOAiR3+22GW8+geSVljjYTK\nbZEHF0LfWW/v46PWmZCrMtNfl74N3NmOciDItUvGwQKBgQD616/O1ksy61ycttYE\n/4bF1g8hkP7GRd7XxZTYKk3r8NMQ3Ho62QfKYCz6UkTzl3vRxkAgY8xx5RUsEslG\nACkpS0xlW3bavnhUCDlP04ZkYiQ1ncR1v/Br+G8ninmu+97/2qa7JEsvf+0EboGU\npvQIsZGPtl6wWYHk3yUNz0/cWQKBgQDaj9NAtw9g4jNE8hEQvdxdQiwJ3q6ivHHE\niUTHkfx0T4w4aU3+0NC0XxMjXkZtG1yYSq4qfXWD8HCQjxmyM7MacK3ISqcUuF9P\naU4qs61x/fQIO5sblGoucqCnKdANXddDuOfdNxQ8EH5AxRm57WzM2omHWHBHLYc7\nQ5/zNISy6wKBgQD5u4iV1TVy0W4Xu9PhkAC+r/nKgk+UWHWevmAMwjlnwBByhf7O\n3cnqysucwBFTryof1E99r74YWmk0wtNN9NUF/qhldKUk7GJhzvo4JjBzel3wX0z7\nqgcTh3gqlqvE8Y+3jBlY0a5k8Oio89fghkMI8LgpqvgkfEhc82gxkodAqQKBgHID\nzWRZGsCjv7MbxCNDqA1OU8LiU5+5RnAMW8DwOw5B4Rgcdv+S1w0A++7bY0nPmEIp\n0yl/QSqO52nB/Nmldq04Uq/FoduBQtceTBSinrx0ijUxQvzkM2//hCcv/MS8S2uc\nrfgMn5Wl1Pbc20rOvI8xAcWFMS0wZvdXk70/jGn5AoGBAIuCTrUyUuLajVXKSPgY\nKdOkEcDg8Q9Mt/QufanxaHjjoN8LIpP6VkZlTbzr1HxzmfhxlzHftI5UsM+SPZSp\nO1QZm9X90VznJRrIUUVVFd5RO5FU+eJO36XJRI4edyQPJA6uZ1w5BuR/09xBEOfo\n6rK99Cm60Cj7QoDhZHsimGAl\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-m5c0r@user-base-2d152.iam.gserviceaccount.com"
  };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
