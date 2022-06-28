function Person(name) {
    this.name = name;
    this.toString = function () {
        console.log('name: ' + this.name);
    };
    return {a:1};
}

const mitchell = new Person("")

const calendar = {
    currentDay: 6,
    nextDay() {
        setTimeout(() => {
            this.currentDay++;
            console.log(this.currentDay);
        });
    },
};
calendar.nextDay();