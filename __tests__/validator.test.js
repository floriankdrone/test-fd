const validator = require('../src/clients/validator');

describe('validator test suite', () => {
  it('should return an error since missing parameters', () => {
    const { error } = validator.schema.validate(
      {
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000,
      },
    );
    expect(error).not.toEqual(undefined);
  });

  it('should return an error since max count is lower than min count', () => {
    const { error } = validator.schema.validate({
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 2000,
    });
    expect(error).not.toEqual(undefined);
  });

  it('should return an error since end date is before start date', () => {
    const { error } = validator.schema.validate({
      startDate: '2016-01-26',
      endDate: '2015-02-02',
      minCount: 2700,
      maxCount: 3000,
    });
    expect(error).not.toEqual(undefined);
  });

  it('should return object', () => {
    const { value, error } = validator.schema.validate({
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    });

    expect(value).toEqual({
      startDate: new Date('2016-01-26T00:00:00.000Z'),
      endDate: new Date('2018-02-02T00:00:00.000Z'),
      minCount: 2700,
      maxCount: 3000,
    });
    expect(error).toEqual(undefined);
  });
});
