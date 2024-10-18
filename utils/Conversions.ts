
export class Conversions{

    static parseTimeString(timeString: string): Date | null{
        const [hours, minutes] = timeString.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
          return null;
        }
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      };

}

