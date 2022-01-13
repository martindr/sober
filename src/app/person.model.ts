import intervalToDuration from "date-fns/intervalToDuration";

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

    getDuration(): String {

        const now = new Date();

        const duration = intervalToDuration({
            start: this.startDate,
            end: now
          });

        const yearLabel = duration.years === 1 ? "year" : "years";
        const monthLabel = duration.months === 1 ? "month" : "months";
        const dayLabel = duration.days === 1 ? "day" : "days";
        
        if (duration.months === 0 && duration.years === 0) {
            return "";
        }

        let friendlyDuration = `${duration.days} ${dayLabel}`;
        if (duration.months != 0) {
            friendlyDuration = `${duration.months} ${monthLabel} ` + friendlyDuration;
        }
        if (duration.years != 0) {
            friendlyDuration = `${duration.years} ${yearLabel} ` + friendlyDuration;
        }

        return friendlyDuration;
    }

}

