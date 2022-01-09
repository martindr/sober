export class Person {

    public name: string;
    public startDate: Date;

    constructor(name: string, startDate: Date) {
        this.name = name;
        this.startDate = startDate;
    }

    private calculateDays(dt: Date): Number {
        return Math.round((Date.now() - dt.getTime()) / (1000 * 3600 * 24));
    }

    getDays(): string {
        return this.calculateDays(this.startDate) + " days";
    }

}

