export class Person {

    public name: string;
    public startDate: Date;

    constructor(name: string, startDate: Date) {
        this.name = name;
        this.startDate = startDate;
    }

    private calculateDays(dt: Date): Number {
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        dt.setHours(0, 0, 0, 0);

        return Math.round((now.getTime() - dt.getTime()) / (1000 * 3600 * 24));
    }

    getDays(): Number {
        return this.calculateDays(this.startDate);
    }

}

