class SmartHike {
    constructor(username) {
        this.username = username;
        this.goals = {};
        this.listOfHiker = [];
        this.resources = 100;
    }

    addGoal(peak, altitude) {

        if (!this.goals[peak]) {
            this.goals[peak] = altitude;
            return `You have successfully added a new goal - ${peak}`
        } else {
            return `${peak} has already been added to your goals`;
        }
    }

    hike(peak, time, difficultyLevel) {
        if (!this.goals[peak]) {
            throw new Error(`${peak} is not in your current goals`);
        } else if ( this.goals[peak] && this.resources <= 0) {
            throw new Error("You don't have enough resources to start the hike");
        } else {
            if ( (this.resources - time * 10) < 0) {
                return "You don't have enough resources to complete the hike";
            } else {
                this.resources -= time * 10;
                //CHECK
                this.listOfHiker.push({peak, time, difficultyLevel});

                return `You hiked ${peak} peak for ${time} hours and you have ${this.resources}% resources left`;
            }
        }
    }

    rest(time) {
        this.resources += time * 10;

        if (this.resources >= 100) {
            this.resources = 100;
            return `Your resources are fully recharged. Time for hiking!`;
        } else {
            return `You have rested for ${time} hours and gained ${time * 10}% resources`;
        }
    }

    showRecord(criteria) {
        if (this.listOfHiker.length == 0) {
            return `${this.username} has not done any hiking yet`;
        }

        const correctHikes = [];
//CHECK
        

        if (criteria == "all") {
            const result = [];

            result.push('All hiking records:');

            for (const hike of this.listOfHiker) {
                result.push(`${this.username} hiked ${hike['peak']} for ${hike['time']} hours`);
            }

            return result.join('\n');
        } else {
            for (const currentHike of this.listOfHiker) {
                if ( currentHike.difficultyLevel == criteria) {
                    correctHikes.push(currentHike);
    
                    const sortedHikes = correctHikes.sort((a, b) => a['time'] - b['time']);
                    return `${this.username}'s best ${criteria} hike is ${sortedHikes[0]['peak']} peak, for ${sortedHikes[0]['time']} hours`; 
                } else {
                    return `${this.username} has not done any ${criteria} hiking yet`
                }
            }
        }

    }
}