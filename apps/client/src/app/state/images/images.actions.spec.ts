import { uploadImages } from '@ocean/client/state/images/images.actions';

describe('Images', () => {
  xit('should create an instance', () => {
    expect(uploadImages({files: [], entityId: 1, entityName: 'name'})).toBeTruthy();
  });
});
