import { UuidToIdPipe } from './uuid-to-id.pipe';

describe('UuidToIdPipe', () => {
  it('create an instance', () => {
    const pipe = new UuidToIdPipe();
    expect(pipe).toBeTruthy();
  });
});
