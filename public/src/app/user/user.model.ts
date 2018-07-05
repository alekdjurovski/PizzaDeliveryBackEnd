export class User {
    public name: string;
    public username: string;
    public email: string;
    public password: string;

    constructor(name?: string, username?: string, email?: string, password?: string) {
        this.name = name || '';
        this.username = username || '';
        this.email = email || '';
        this.password = password || '';
    }
}
