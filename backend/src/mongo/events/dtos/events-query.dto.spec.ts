import { validate } from 'class-validator';
import { EventsQueryDto } from './events-query.dto';

describe('EventsQueryDto validation', () => {
  it('Debe fallar si limit no es número', async () => {
    const dto = new EventsQueryDto();
    dto.limit = 'abc';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('Debe fallar si skip no es número', async () => {
    const dto = new EventsQueryDto();
    dto.skip = 'xyz';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('Debe aceptar limit y skip numéricos como strings', async () => {
    const dto = new EventsQueryDto();
    dto.limit = '20';
    dto.skip = '40';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('Debe aceptar type, userId y source como strings', async () => {
    const dto = new EventsQueryDto();
    dto.type = 'ORDER_CREATED';
    dto.userId = '55';
    dto.source = 'api';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('Debe permitir DTO vacío sin errores', async () => {
    const dto = new EventsQueryDto();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
