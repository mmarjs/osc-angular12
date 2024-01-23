import { boatsReducer } from './reducer';
import { initialState } from './state';
import { BoatActions } from '@ocean/client/state';
import { Boat, BoatOutputDTO, User } from '@ocean/api/shared';
import { UserActions } from '@ocean/api/state';

describe('Boats Reducer', () => {
  it('It selects boat', () => {
    const boat: Boat = {
      id: 1,
      name: 'name'
    };

    const action = BoatActions.setSelectedBoat({boat});
    const result = boatsReducer(initialState, action);

    expect(result).toHaveProperty('selectedBoat', boat);
  });

  it('It sets total boats count correctly', () => {
    const boats: Boat[] = [
      {
        id: 0,
        name: 'name0'
      },
      {
        id: 1,
        name: 'name1'
      }
    ];

    const user: User = {
      id: 2,
      firstName: 'firstName',
      boats
    };

    const loginSuccessAction = UserActions.loginUserSuccess({user});

    const result = boatsReducer(initialState, loginSuccessAction);
    expect(result).toHaveProperty('total', 2);
  });

  it('It creates a boat', () => {

    const boat: BoatOutputDTO = {
      id: 1,
      name: 'name'
    };

    const boatCreatedAction = BoatActions.createBoatSuccess({boat});

    const result = boatsReducer(initialState, boatCreatedAction);
    expect(result).toHaveProperty('createdBoat', boat);
  });

  it('total should increment when a boat was created', () => {
    const boat: BoatOutputDTO = {
      id: 1,
      name: 'name'
    };

    const boatCreatedAction = BoatActions.createBoatSuccess({boat});

    const result = boatsReducer(initialState, boatCreatedAction);
    expect(result).toHaveProperty('total', 1);
  });

  it('It update a boat', () => {
    const boat: BoatOutputDTO = {
      id: 1,
      name: 'name'
    };

    const boatUpdatedAction = BoatActions.updateBoatSuccess({boat});

    const result = boatsReducer(initialState, boatUpdatedAction);
    expect(result).toHaveProperty('updatedItem', boat);
  });

  it('selected boat equal 0 if initial state is null', () => {
    const boat: BoatOutputDTO = {
      id: 1,
      name: 'name'
    };
    const boatUpdatedAction = BoatActions.updateBoatSuccess({boat});

    const result = boatsReducer(initialState, boatUpdatedAction);
    expect(result).toHaveProperty('selectedBoat', null);
  });

  it('expect selected boat equal 0 if initial state is not null', () => {
    const boat: BoatOutputDTO = {
      id: 1,
      name: 'name'
    };

    const selectedBoat: Boat = {
      id: 2,
      name: 'name'
    };

    const boatUpdatedAction = BoatActions.updateBoatSuccess({boat});
    const setSelectedBoat = BoatActions.setSelectedBoat({boat: selectedBoat});

    const state = boatsReducer(initialState, setSelectedBoat);
    const result = boatsReducer(state, boatUpdatedAction);
    expect(result).toHaveProperty('selectedBoat', boat);
  });
});
