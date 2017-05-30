$(document).ready(function() {
    var work = true;
    var workDuration = 25 * 60;
    var restDuration = 5 * 60;
    var value = 0;
    var chip = 100 / workDuration;
    var display = $('#time');
    var isPaused = false;
    var workSignal = $('#workSignal');
    var restSignal = $('#restSignal');
    var resetProgress = function() {
        $('.progress-bar').css('width', '0%');
    }

    // timer function
    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;
        var refresh = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + " : " + seconds);

            if (!isPaused) {
                value += chip;
                $('.progress-bar').css('width', value + '%');
                if (--timer < 0) {
                    clearInterval(refresh);
                    var music = $("#over_music")[0];
                    music.play();
                    if (work === true) {
                        display.text("Rest!");
                        resetProgress();
                        workSignal.css('background', '');
                        restSignal.css('background', 'orange');
                        value = 0;
                        chip = 100 / restDuration;
                        startTimer(restDuration, display);
                        work = false;
                    } else {
                        display.text("Work!");
                        resetProgress();
                        workSignal.css('background', 'orange');
                        restSignal.css('background', '');
                        value = 0;
                        chip = 100 / workDuration;
                        startTimer(workDuration, display);
                        work = true;
                    }

                }
            } else {
                display.text("Ready");
                resetProgress();
                clearInterval(refresh);
            }
        }, 1000);
    }

    // start timer
    startTimer(workDuration, display);

    // adjust session duration
    $('#workMore').on('click', function() {
        isPaused = true;
        workDuration = (parseInt($('#workTime').html(), 10) + 1) * 60;
        $('#workTime').html(workDuration / 60);
    });

    $('#workLess').on('click', function() {
        isPaused = true;
        workDuration = (parseInt($('#workTime').html(), 10) - 1) * 60;
        $('#workTime').html(workDuration / 60);
    });

    $('#restMore').on('click', function() {
        isPaused = true;
        restDuration = (parseInt($('#restTime').html(), 10) + 1) * 60;
        $('#restTime').html(restDuration / 60);
    });

    $('#restLess').on('click', function() {
        isPaused = true;
        restDuration = (parseInt($('#restTime').html(), 10) - 1) * 60;
        $('#restTime').html(restDuration / 60);
    });

    $('.start').click(function() {
        if (isPaused === true) {
            isPaused = false;
            resetProgress();
            value = 0;
            chip = 100 / workDuration;
            startTimer(workDuration, display);
        }
    });

    $('.reset').click(function() {
        isPaused = true;
        workSignal.css('background', 'orange');
        restSignal.css('background', '');
    });
})
