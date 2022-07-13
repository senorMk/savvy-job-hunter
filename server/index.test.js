import request from 'supertest';
import app from './app';

describe('Jobs API', () => {
  it(
    'GET /get/:jobId returns an object of type job',
    () => {
      return request(app)
        .get('/api/v1/jobs/get/62a9ab88938355a488d19920')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              __v: expect.any(Number),
              companyLogo: expect.any(String),
              companyLogoAlt: expect.any(String),
              companyName: expect.any(String),
              created: expect.any(String),
              dateOpen: expect.any(String),
              jobDescriptionHtml: expect.any(String),
              jobDescriptionText: expect.any(String),
              location: expect.any(String),
              position: expect.any(String),
              verified: expect.any(Boolean),
            })
          );
        });
    },
    30 * 1000
  );
});
