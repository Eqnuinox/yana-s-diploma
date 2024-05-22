class UserDto {
    id;
    role;
    username;

    constructor(model) {
        this.id = model.id;
        this.role = model.role;
        this.username = model.username;
    }
}

export default UserDto;
