export default class Timer{
    constructor(container){ /* root = div.timer */
        container.innerHTML = Timer.getHTML();

        this.timerEL = {
            minutes: container.querySelector('.timer_part-minutes'),
            seconds: container.querySelector('.timer_part-seconds'),
            control: container.querySelector('.timer_btn-control'),
            reset: container.querySelector('.timer_btn-reset')
        };

        this.interval = null;
        this.remainingSeconds = 0;

        this.updateInterfaceTime();
        this.updateInterfaceControls();

        this.timerEL.control.addEventListener("click", () => {
            if (this.interval == null) {
                this.start();
            }
            else{
                this.stop();
            }
        })

        this.timerEL.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Enter number of minutes (in seconds, i.e 2(minutes) * 60(seconds) = 120(seconds), but no more than an hour):");

            if (inputMinutes > 3600){
                alert("I said no more than an hour!!");
                return;
            }
            if (!Number(inputMinutes)){
                alert("Not a number I am afraid :)")
                return;
            }

            this.remainingSeconds = Number(inputMinutes);
            this.stop();
            this.updateInterfaceTime();
        })
    }

    // Start method
    start(){
        if (this.remainingSeconds == 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds -= 1;
            this.updateInterfaceTime();

            if (this.remainingSeconds == 0){
                this.stop();
            }
        }, 1000)

        this.updateInterfaceControls();
    }

    // Stop method
    stop(){
        if (this.remainingSeconds == 0) alert("YAY TIMER IS DONE!");

        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }

    // Update control button UI
    updateInterfaceControls(){
        if (this.interval == null) {
            this.timerEL.control.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`; 
            this.timerEL.control.classList.add("timer_btn-start"); 
            this.timerEL.control.classList.remove("timer_btn-stop"); 
        }
        else{
            this.timerEL.control.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
            this.timerEL.control.classList.add("timer_btn-stop");
            this.timerEL.control.classList.remove("timer_btn-start");
        }
    }

    // Update timer in HTML based on remaining seconds
    updateInterfaceTime(){
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.timerEL.minutes.innerText = minutes.toString().length == 1 ? "0" + minutes : minutes;
        this.timerEL.seconds.innerText = seconds.toString().padStart(2, "0");
    }

    // Injects HTML code to browser
    static getHTML(){
        return `
            <span class="timer_part timer_part-minutes">00</span>
            <span class="timer_part">:</span>
            <span class="timer_part timer_part-seconds">00</span>
            <hr/>
            <button type="button" class="timer_btn timer_btn-control timer_btn-start">
                <span class="material-symbols-outlined">play_arrow<!--or pause--></span>
            </button>
            <button type="button" class="timer_btn timer_btn-reset">
                <span class="material-symbols-outlined">timer</span>
            </button>
        `;
    }
}