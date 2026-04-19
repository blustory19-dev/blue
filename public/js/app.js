// Study Planner Application

class StudyPlanner {
    constructor() {
        this.tasks = [];
        this.notes = [];
        this.progress = 0;
        this.pomodoroDuration = 25; // in minutes
        this.breakDuration = 5; // in minutes
        this.activeTimer = null;
    }

    addTask(name, deadline) {
        const task = { name, deadline, completed: false };
        this.tasks.push(task);
    }

    completeTask(index) {
        if (this.tasks[index]) {
            this.tasks[index].completed = true;
        }
    }

    addNote(content) {
        this.notes.push(content);
    }

    startPomodoro() {
        this.activeTimer = setTimeout(() => {
            console.log('Pomodoro session finished! Take a break.');
            this.startBreak();
        }, this.pomodoroDuration * 60 * 1000);
    }

    startBreak() {
        setTimeout(() => {
            console.log('Break session finished! Get back to work.');
            this.activeTimer = null;
        }, this.breakDuration * 60 * 1000);
    }

    trackProgress() {
        const completedTasks = this.tasks.filter(task => task.completed).length;
        this.progress = (completedTasks / this.tasks.length) * 100;
    }

    getCurrentDate() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}

// Example Usage
const planner = new StudyPlanner();
planner.addTask('Complete math homework', '2026-04-20');
planner.addTask('Study for biology exam', '2026-04-25');
planner.startPomodoro();
console.log('Current date and time: ', planner.getCurrentDate());