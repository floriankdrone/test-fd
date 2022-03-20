const mockFetch = jest.fn();
jest.mock('../src/clients/db', () => ({
  fetch: mockFetch,
}));

const model = require('../src/models/records');

describe('Records test suite', () => {
  describe('fetch method', () => {
    const startDate = new Date('2016-01-26');
    const endDate = new Date('2018-02-02');
    const minCount = 2700;
    const maxCount = 3000;

    beforeEach(() => {
      mockFetch.mockClear();
    });

    it('should fail to fetch', async () => {
      const error = new Error('Failed');
      mockFetch.mockRejectedValueOnce(error);
      await expect(
        model.fetch(startDate, endDate, minCount, maxCount),
      ).resolves.toEqual({
        code: -30500,
        msg: 'Internal error',
      });
      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(
        'records',
        startDate,
        endDate,
        minCount,
        maxCount,
      );
    });

    it('should successfully fetch', async () => {
      mockFetch.mockResolvedValueOnce([
        {
          key: 'TAKwGc6Jr4i8Z487',
          createdAt: '2017-01-28T01:22:14.398Z',
          totalCount: 2800,
        },
        {
          key: 'NAeQ8eX7e5TEg7oH',
          createdAt: '2017-01-27T08:19:14.135Z',
          totalCount: 2900,
        },
      ]);
      await expect(
        model.fetch(startDate, endDate, minCount, maxCount),
      ).resolves.toEqual({
        code: 0,
        msg: 'Success',
        records: [
          {
            key: 'TAKwGc6Jr4i8Z487',
            createdAt: '2017-01-28T01:22:14.398Z',
            totalCount: 2800,
          },
          {
            key: 'NAeQ8eX7e5TEg7oH',
            createdAt: '2017-01-27T08:19:14.135Z',
            totalCount: 2900,
          },
        ],
      });
      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(
        'records',
        startDate,
        endDate,
        minCount,
        maxCount,
      );
    });
  });
});
