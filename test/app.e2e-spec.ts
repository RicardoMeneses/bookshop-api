import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const object = {
  _id: '64083b1c48e694e5621ec239',
  slug: 'los-secretos-de-la-mente-millonaria',
  title: 'Los secretos de la mente millonaria',
  author: 'asdasd',
  imgUrl: 'https://m.media-amazon.com/images/I/91xfa9CTPbS.jpg',
  synopsis: 'asdad',
  publisher: 'Salamandra bolsillo',
  language: 'english',
  numberOfPages: '234',
  publicationDate: '2023-03-04',
  isFavorite: true,
  __v: 0,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([object] || []);
  });
});
