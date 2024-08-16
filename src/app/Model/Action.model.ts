
// create the class action

export class Action {
    id: number;
    name: string;
    brief:string;
    constructor(id: number, name: string,brief:string) {
        this.id = id;
        this.name = name;
        this.brief=brief;
    }
}