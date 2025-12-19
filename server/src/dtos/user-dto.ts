import { UserInterface } from '../types';

export class UserDto {
    email;
    id;
    isActivated;

    constructor(model: UserInterface) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}
