class Event {
    constructor(date, time, description, participants = []) {
        this.id = Event.generateId();
        this.date = date;
        this.time = time;
        this.description = description;
        this.participants = participants; // Array of user IDs - ref: 'User'
    }

    static generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            time: this.time,
            description: this.description,
            participants: this.participants,
        };
    }
}

module.exports = Event;