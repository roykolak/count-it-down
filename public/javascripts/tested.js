$.urlParam = function(name){
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return (results != null ? unescape(results[1]) : null);
}

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
      selector = '#seconds .digit_one .n, #minutes .n, #hours .n, #days .n';
    } else if(m == 0 && s < 3) {
      selector = '#seconds .digit_one .n, #minutes .n, #hours .n';
    } else if(s < 3) {
      selector = '#seconds .digit_one .n, #minutes .n';
    } else if(s[1] < 3) {
      selector = '#seconds .digit_one .n';
    }

    return selector;
  }
      
  return {
    flashIfNeeded: function() {
      var selector = getSelector();

      if(typeof(selector) != 'undefined') {
        $(selector).toggleClass('red');
      } else {
        $('#seconds .digit_one .n, #minutes .n, #hours .n, #days .n').removeClass('red'); 
      }
    },
    flashAll: function() {
      $('.n').removeClass('red');
      return setInterval(function() {
        $('.n').toggleClass('red');
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

      $('.date_info, .error').hide();

      if(date == 'Invalid Date' || date == 'NaN') {
        valid = false;
        $('.parse_error').fadeIn();
      } else if(diff.days > 99){
        valid = false;
        $('.diff_error').fadeIn();
      } else {
        $('.date_info').fadeIn();
      }

      return valid;
    }
  }; 
}

function Mover(container, unit) {
  var previousTime = null,
      height = $('.n li').height(),
      digitOne = $('.digit_one .n', container),
      digitTwo = $('.digit_two .n', container),
      firstDigitCount, secondDigitCount;
      
  if(unit == 'days') {
    firstDigitCount = 10;
    secondDigitCount = 10;
  } else if(unit == 'hours') {
    firstDigitCount = 3;
    secondDigitCount = 10;
  } else {
    firstDigitCount = 6;
    secondDigitCount = 10;
  }

  digitOneJumped = false;
  digitTwoJumped = false;

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
          digitOneJumped = false;
          digitTwoJumped = false;
          
          $(digitOne).animate({ top:-(time[0] * this.height) }, function() {
            self.callback.call(this, time[0], self.height, firstDigitCount);
          });
          $(digitTwo).animate({ top:-(time[1] * this.height) }, function() {
            self.callback.call(this, time[1], self.height, secondDigitCount);
          });
        } else if(time.length == 1) {
          digitTwoJumped = false;

          if(digitOneJumped != true) {
            $(digitOne).animate({ top:0 }, function() {
              self.callback.call(this, 0, self.height, firstDigitCount);
              digitOneJumped = true;
            });
          }
          $(digitTwo).animate({ top:-(time * this.height) }, function() {
            self.callback.call(this, time, self.height, secondDigitCount);
          });
        } else {
          if(digitOneJumped != true) {
            $(digitOne).animate({ top:0 }, function() {
              self.callback.call(this, 0, self.height, firstDigitCount);
              digitOneJumped = true;
            });
          }
          if(digitTwoJumped != true) {
            $(digitTwo).animate({ top:-(time * this.height) }, function() {
              self.callback.call(this, time, self.height, secondDigitCount);
              digitTwoJumped = true;
            });
          }
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

function Clock(title, date) {
  var dateDifference = new DateDifference(new Date(date)),
      clockInterval, 
      flasherInterval;

  localStorage.date = date;
  localStorage.title = title;

  $('#seconds .p_two .n').addClass('red');
  
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
        
          if(localStorage.sound == "1") {
            audio.play();
          }
        
          new Flasher(diff.days, diff.hours, diff.minutes, diff.seconds).flashIfNeeded();
        }
      }, 1000);
    },
    stop: function() {
      clearInterval(clockInterval);
      audio.pause();
    },
    reset: function() {
      this.stop();
      $('.n').animate({top:0});
      clearInterval(flasherInterval);
    }
  };
}

function Loader() {
  $('.wrapper').css({ paddingTop:$(window).height() / 4 });
  $('.section, #frame').height($(window).height());
  
  function populateInputs(titleFromUrl) {
    if(titleFromUrl != null) {
      $('#title').val($.urlParam('title'));
      $('#date').val($.urlParam('date'));
    } else {
      $('#date').attr('placeholder', 'November 5, 2010 13:00');
    }
  }
  
  function showPreviousClock(storedTitle) {
    if(storedTitle != undefined) {
      $('#previous_clock').text(localStorage.title);
      $('#previous').show();
    } else {
      $('#previous').hide();
    }
  }
  
  function resetClock() {
    if(clock != null) {
      clock.reset();
    }    
  }
  
  return {
    clock: function(title, date) {
      $('#end_date').text(date.toLocaleString());
      $('#clock_title').text(title);
      
      var url = window.location.href.replace(window.location.search, '') + '?title=' + title + '&date=' + date;
      $('#url').text(url);
      $('#url').attr('href', url);
      
      $('#sections').animate({top: -$('.section').height() }, function() {
        clock = new Clock(title, date);
        clock.start();
      });
    },
    form: function() {
      $('input[type=text]').val('');
      $('#sections').animate({top:0 });
      $('.date_info').show();
      $('.error').hide();
      
      populateInputs($.urlParam('title'));
      showPreviousClock(localStorage.title);
      resetClock();
      
      if(!$.browser.webkit) {
        new PlaceHolder('input#date');
        new PlaceHolder('input#title');
      }
    }
  };
}

function SoundToggler() {
  var onText = 'Sound On',
      offText = 'Sound Off';
  
  if(localStorage.sound == undefined) {
    localStorage.sound = "1";
  }
  
  var text = (localStorage.sound == '1' ? offText : onText);
  $('#toggle_sound').text(text);
  
  return {
    toggle: function () {
      if(localStorage.sound == "1") {
        localStorage.sound = "0";
        $('#toggle_sound').text(onText);
        audio.pause();
      } else {
        localStorage.sound = "1";
        $('#toggle_sound').text(offText);
      }
    }
  }
}
 
function PlaceHolder(element) {
  var placeholder = $(element).attr('placeholder');
  
  $(element).blur(function() {
    if($(element).val() == '') {
      $(element).val(placeholder);
      $(element).addClass('placeholder');
    }    
  });
  
  $(element).focus(function() {
    if($(element).val() == placeholder) {
      $(element).removeClass('placeholder');
      $(element).val('');
    }
  });
  
  if($(element).val() == '') {
    $(element).addClass('placeholder');
    $(element).val(placeholder);
  }
}
 
function g(element, from, to) {
  $(element).css('background', 'linear-gradient(left top, ' + from + ', ' + to + ')');
  $(element).css('background', '-webkit-gradient(linear, 0% 0%, 0% 100%, from(' + from + '), to(' + to + '))');
  $(element).css('background', '-moz-linear-gradient(center top, ' + from + ', ' + to + ')');
  if($.browser.msie) {
    $(element).css('background', from);
  }
}

function borderRadius(element, value) {
  $(element).css('border-radius', value);
  $(element).css('-moz-border-radius', value);
}

(function($) { 
  g('.hint', '#6185af', '#30445c');
  g('p.error', '#b666b9', '#5a305c');
  
  $('input[type=text]').hover(function() {
    $(this).css('background', '#eee');
  }, function() {
    g(this, '#BBB', '#EEE');
  });
  
  g('input[type=text]', '#BBB', '#EEE');
  
  $('.b').hover(function() {
    g(this, '#ff0000', '#a22c11');
  }, function() {
    g(this, '#ba3b1d', '#a22c11');
  });
  g('.b', '#ba3b1d', '#a22c11');

  g('#f', '#30445c', '#555');
  g('#clock', '#695e2e', '#a49764');
  
  borderRadius('.hint', '4px');
  borderRadius('.p', '10px');
  borderRadius('input', '7px');
  borderRadius('.b.small', '5px');
  
  audio = document.getElementsByTagName("audio")[0],
  clock = null,
  loader = new Loader(),
  soundToggler = new SoundToggler();

  loader.form();

  $('#load').click(function(ev) {
    ev.preventDefault();
    var title = $('#title').val() || $('#title').attr('placeholder');
    var date = $('#date').val() || $('#date').attr('placeholder');
    
    if(new DateValidator(date).validate()) {
      loader.clock(title, date);
    }
  });
  
  $('#resume').click(function(ev) {
    ev.preventDefault();
    loader.clock(localStorage.title, localStorage.date);
  });

  $('#back').click(function(ev) {
    ev.preventDefault();
    loader.form();
  });

  $('#toggle_sound').click(function(ev) {
    ev.preventDefault();
    soundToggler.toggle();
  });
  
  if($.browser.msie) {
    $('.d, .colon, .overlay').css('height','130px');
  }
})($);