function DateDifference(date) {
  return { 
    between: function(dateToDiff) {
      var diff = Math.ceil(date.getTime() - dateToDiff.getTime());

      days = Math.floor(diff / (1000 * 60 * 60 * 24)); 
      diff -= days * (1000 * 60 * 60 * 24);

      hours = Math.floor(diff / (1000 * 60 * 60)); 
      diff -= hours * (1000 * 60 * 60);

      minutes = Math.floor(diff / (1000 * 60)); 
      diff -= minutes * (1000 * 60);

      seconds = Math.floor(diff / 1000);
      
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  };
};        

function Flasher(d, h, m, s) {
  var s = s.toString(),
      m = m.toString(),
      h = h.toString(),
      d = d.toString();
      
  function getSelector() {
    var selector;
    
    if(h == 0 && m == 0 && s < 3) {
      selector = '#seconds .digit_one .numbers, #minutes .numbers, #hours .numbers, #days .numbers';
    } else if(m == 0 && s < 3) {
      selector = '#seconds .digit_one .numbers, #minutes .numbers, #hours .numbers';
    } else if(s < 3) {
      selector = '#seconds .digit_one .numbers, #minutes .numbers';
    } else if(s[1] < 3) {
      selector = '#seconds .digit_one .numbers';
    }

    return selector;
  }
      
  return {
    flashIfNeeded: function() {
      var selector = getSelector();

      if(typeof(selector) != 'undefined') {
        $(selector).toggleClass('red');
      } else {
        $('#seconds .digit_one .numbers, #minutes .numbers, #hours .numbers, #days .numbers').removeClass('red'); 
      }
    },
    flashAll: function() {
      $('.numbers').removeClass('red');
      return setInterval(function() {
        $('.numbers').toggleClass('red');
      }, 1000);
    }
  };
}

function DateValidator(date, currentDate) {
  return {
    date:date,
    currentDate:currentDate,
    
    validate: function() {
      var valid = true;
      
      date = new Date(date);
      var diff = new DateDifference(date).between(new Date());

      if(date == 'Invalid Date') {
        valid = false;
      } else if(diff.days > 99){
        valid = false;
      }

      return valid;
    }
  }; 
}

function Mover(container, unit) {
  var previousTime = null,
      height = $('.numbers li').height(),
      digitOne = $('.digit_one .numbers', container),
      digitTwo = $('.digit_two .numbers', container);

  return {
    container: container,
    unit: unit,
    height: height,
    previousTime: previousTime,
    
    move: function(time) {
      var time = time.toString();
        
      if(this.previousTime != time) {
        this.previousTime = time;
        var self = this; 
        if(time.length == 2) {
          $(digitOne).animate({ top:-(time[0] * this.height) }, function() {
            self.callback(time[0], self.height, 10).call(this);
          });
          $(digitTwo).animate({ top:-(time[1] * this.height) }, function() {
            self.callback(time[1], self.height, 10).call(this);
          });
        } else {
          $(digitOne).animate({ top:0 }, function() {
            self.callback(0, self.height, 10).call(this);
          });
          $(digitTwo).animate({ top:-(time * this.height) }, function() {
            self.callback(time, self.height, 10).call(this);
          });
        }
      }
    },
    callback: function(digit, height, maxDigits) {
      if(digit * height == 0) {
        $(this).css({ top: -(maxDigits * height) });
      }
    }
  };
}

function Clock(date, title) {
  var dateDifference = new DateDifference(new Date(date)),
      clockInterval, 
      flasherInterval;
  
  db.date = date;
  db.title = title;
  
  $('#seconds .digit_two .numbers').addClass('red');
  
  var dayMover = new Mover($('#days'), 'days'),
      hourMover = new Mover($('#hours'), 'hours'),
      minuteMover = new Mover($('#minutes'), 'minutes'),
      secondMover = new Mover($('#seconds'), 'seconds');
  
  return {
    date: date,
    title: title,
    start: function() {
      clockInterval = setInterval(function() {
        var diff = dateDifference.between(new Date());
        
        if(diff.days < 0 || diff.hours < 0 || diff.minutes < 0 || diff.seconds < 0) {
          flasherInterval = new Flasher(diff.days, diff.hours, diff.minutes, diff.seconds).flashAll();
          audio.pause();
          clock.stop();
        } else {
          dayMover.move(diff.days);
          hourMover.move(diff.hours);
          minuteMover.move(diff.minutes);
          secondMover.move(diff.seconds);
        
          if(db.sound == "1") {
            audio.play();
          }
        
          new Flasher(diff.days, diff.hours, diff.minutes, diff.seconds).flashIfNeeded();
        }
      }, 1000);
    },
    stop: function() {
      clearInterval(clockInterval);
      //audio.pause();
    },
    reset: function() {
      $('.numbers').animate({top:0});
      clearInterval(flasherInterval);
    }
  };
}