import { ImagesActions } from '@ocean/client/state/images/images.actions';

describe('Images', () => {
  xit('should create an instance', () => {
    expect(
      ImagesActions.uploadImages({ files: [], entityId: 1, entityName: 'name' })
    ).toBeTruthy();
  });
});
