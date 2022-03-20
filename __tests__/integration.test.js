const express = require('express');
const request = require('supertest');
const controllers = require('../src/controllers'); // import file we are testing
const records = require('../src/models/records');

const app = express();
app.use(express.json());
app.use(controllers);

describe('POST / route', () => {
  it('should return bad request', async () => {
    const { body } = await request(app).post('/'); // uses the request function that calls on express app instance
    expect(body).toEqual({ code: -30400, msg: 'Bad request' });
  });

  it('should return internal error', async () => {
    const { body } = await request(app)
      .post('/')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000,
      });
    expect(body).toEqual({
      code: -30500,
      msg: 'Internal error',
    });
  });

  it('should return records', async () => {
    const spy = jest.spyOn(records, 'fetch');
    spy.mockResolvedValueOnce({
      code: 0,
      msg: 'Success',
      record: [
        {
          key: 'ibfRLaFT',
          createdAt: '2016-12-25T16:43:27.909Z',
          totalCount: 2892,
        },
        {
          key: 'pxClAvll',
          createdAt: '2016-12-19T10:00:40.050Z',
          totalCount: 2772,
        },
      ],
    });
    const { body } = await request(app).post('/').send({
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    });
    expect(body).toEqual({
      code: 0,
      msg: 'Success',
      record: [
        {
          key: 'ibfRLaFT',
          createdAt: '2016-12-25T16:43:27.909Z',
          totalCount: 2892,
        },
        {
          key: 'pxClAvll',
          createdAt: '2016-12-19T10:00:40.050Z',
          totalCount: 2772,
        },
      ],
    });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      new Date('2016-01-26'),
      new Date('2018-02-02'),
      2700,
      3000,
    );
    spy.mockRestore();
  });
});
