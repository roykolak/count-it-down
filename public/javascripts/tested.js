db = localStorage;
mf = Math.floor;

$.fn.a = $.fn.animate;
$.fn.c = $.fn.css;
$.fn.cl = $.fn.click;
$.fn.v = $.fn.val;
$.fn.h = $.fn.hover;
$.fn.rc = $.fn.removeClass;
$.fn.ac = $.fn.addClass;
$.fn.t = $.fn.attr;
$.fn.x = $.fn.text;
ie = $.browser.msie;
sI = setInterval;
cI = clearInterval;


$.u = function(n){
  var r = new RegExp('[\\?&]' + n + '=([^&#]*)').exec(window.location.href);
  return (r != null ? unescape(r[1]) : null);
};

function DD(t) {
  return {
    b: function(g) {
      var e = Math.ceil(t.getTime() - g.getTime());
      d = mf(e / (1000 * 60 * 60 * 24)); 
      e -= d * (1000 * 60 * 60 * 24);
      h = mf(e / (1000 * 60 * 60)); 
      e -= h * (1000 * 60 * 60);
      m = mf(e / (1000 * 60)); 
      e -= m * (1000 * 60);
      s = mf(e / 1000);      
      return { d: d, h: h, m: m, s: s };
    }
  };
};        

function F(d, h, m, s) {
  var s = s.toString(),
      m = m.toString(),
      h = h.toString(),
      d = d.toString();
      
  function gS() {
    var se;
    
    if(h == 0 && m == 0 && s < 3) {
      se = '#s .digit_one .n, #m .n, #h .n, #d .n';
    } else if(m == 0 && s < 3) {
      se = '#s .digit_one .n, #m .n, #h .n';
    } else if(s < 3) {
      se = '#s .digit_one .n, #m .n';
    } else if(s[1] < 3) {
      se = '#s .digit_one .n';
    }

    return se;
  }
      
  return {
    fin: function() {
      var s = gS();

      if(typeof(s) != 'undefined') {
        $(s).toggleClass('red');
      } else {
        $('#s .digit_one .n, #m .n, #h .n, #d .n').rc('red'); 
      }
    },
    fa: function() {
      $('.n').rc('red');
      return sI(function() {
        $('.n').toggleClass('red');
      }, 1000);
    }
  };
}

function DV(d) {
  return {
    v: function() {
      var v = true;
      
      d = new Date(d);
      var diff = new DD(d).b(new Date());

      $('.date_info, .error').hide();

      if(d == 'Invalid Date' || d == 'NaN') {
        v = false;
        $('.parse_error').fadeIn();
      } else if(diff.d > 99){
        v = false;
        $('.diff_error').fadeIn();
      } else {
        $('.date_info').fadeIn();
      }

      return v;
    }
  }; 
}

function M(c, u) {
  var pT = null,
      h = $('.n li').height(),
      dO = $('.digit_one .n', c),
      dT = $('.digit_two .n', c),
      fD, sD;
      
  if(u == 'days') {
    fD = 10;
    sD = 10;
  } else if(u == 'hours') {
    fD = 3;
    sD = 10;
  } else {
    fD = 6;
    sD = 10;
  }

  doj = false;
  dtj = false;

  return {
    h: h,
    pT: pT,
    
    m: function(t) {
      var t = t.toString();
      
      if(this.pT != t) {
        this.pT = t;
        var s = this; 
        if(t.length == 2) {
          doj = false;
          dtj = false;
          
          $(dO).a({ top:-(t[0] * this.h) }, function() {
            s.c.call(this, t[0], s.h, fD);
          });
          $(dT).a({ top:-(t[1] * this.h) }, function() {
            s.c.call(this, t[1], s.h, sD);
          });
        } else if(t.length == 1) {
          dtj = false;

          if(doj != true) {
            $(dO).a({ top:0 }, function() {
              s.c.call(this, 0, s.h, fD);
              doj = true;
            });
          }
          $(dT).a({ top:-(t * this.h) }, function() {
            s.c.call(this, t, s.h, sD);
          });
        } else {
          if(doj != true) {
            $(dO).a({ top:0 }, function() {
              s.c.call(this, 0, s.h, fD);
              doj = true;
            });
          }
          if(dtj != true) {
            $(dT).a({ top:-(t * this.h) }, function() {
              s.c.call(this, t, s.h, sD);
              dtj = true;
            });
          }
        }
      }
    },
    c: function(d, h, m) {
      if(d * h == 0) {
        $(this).c({ top: -(m * h) });
      }
    }
  };
}

function C(t, d) {
  var dd = new DD(new Date(d)),
      ci, 
      fi;

  db.date = d;
  db.title = t;

  $('#s .p_two .n').ac('red');
  
  var dM = new M($('#d'), 'days'),
      hM = new M($('#h'), 'hours'),
      mM = new M($('#m'), 'minutes'),
      sM = new M($('#s'), 'seconds');
  
  return {
    start: function() {
      ci = sI(function() {
        var f = dd.b(new Date());

        if(f.d < 0 || f.h < 0 || f.m < 0 || f.s < 0) {
          fi = new F(f.d, f.h, f.m, f.s).fa();
          k.stop();
        } else {
          dM.m(f.d);
          hM.m(f.h);
          mM.m(f.m);
          sM.m(f.s);
        
          new F(f.d, f.h, f.m, f.s).fin();
        }
      }, 1000);
    },
    stop: function() {
      cI(ci);
    },
    reset: function() {
      this.stop();
      $('.n').a({top:0});
      cI(fi);
    }
  };
}

function L() {
  $('.wrapper').c({ paddingTop:$(window).height() / 4 });
  $('.section, #frame').height($(window).height());
  
  function pI(t) {
    if(t != null) {
      $('#title').v($.u('t'));
      $('#date').v($.u('d'));
    } else {
      $('#date').t('placeholder', 'November 5, 2010 13:00');
    }
  }
  
  function sP(s) {
    if(s != undefined) {
      $('#previous_clock').x(db.title);
      $('#previous').show();
    } else {
      $('#previous').hide();
    }
  }
  
  function rC() {
    if(k != null) {
      k.reset();
    }    
  }
  
  return {
    c: function(title, date) {
      $('#end_date').x(date.toLocaleString());
      $('#clock_title').x(title);
      
      var url = window.location.href.replace(window.location.search, '') + '?t=' + title + '&d=' + date;
      $('#url').x(url);
      $('#url').t('href', url);
      
      $('#sections').a({top: -$('.section').height() }, function() {
        k = new C(title, date);
        k.start();
      });
    },
    f: function() {
      $('input[type=text]').v('');
      $('#sections').a({top:0 });
      $('.date_info').show();
      $('.error').hide();
      
      pI($.u('title'));
      sP(db.title);
      rC();
      
      if(!$.browser.webkit) {
        new PH('input#date');
        new PH('input#title');
      }
    }
  };
}
 
function PH(e) {
  var c = 'placeholder';
  var p = $(e).t(c);
  
  $(e).blur(function() {
    if($(e).v() == '') {
      $(e).v(p);
      $(e).ac(c);
    }    
  });
  
  $(e).focus(function() {
    if($(e).v() == p) {
      $(e).rc(c);
      $(e).v('');
    }
  });
  
  if($(e).v() == '') {
    $(e).ac(c);
    $(e).v(p);
  }
}
 
function g(e, f, t) {
  var b = 'background';
  $(e).c(b, 'linear-gradient(left top, ' + f + ', ' + t + ')');
  $(e).c(b, '-webkit-gradient(linear, 0% 0%, 0% 100%, from(' + f + '), to(' + t + '))');
  $(e).c(b, '-moz-linear-gradient(center top, ' + f + ', ' + t + ')');
  if(ie) {
    $(e).c(b, f);
  }
}

function br(e, v) {
  $(e).c('border-radius', v);
  $(e).c('-moz-border-radius', v);
}

(function($) { 
  g('.hint', '#6185af', '#30445c');
  g('p.error', '#b666b9', '#5a305c');
  
  $('input[type=text]').h(function() {
    $(this).c('background', '#eee');
  }, function() {
    g(this, '#BBB', '#EEE');
  });
  
  g('input[type=text]', '#BBB', '#EEE');
  
  $('.b').h(function() {
    g(this, '#ff0000', '#a22c11');
  }, function() {
    g(this, '#ba3b1d', '#a22c11');
  });
  g('.b', '#ba3b1d', '#a22c11');

  g('#f', '#30445c', '#555');
  g('#clock', '#695e2e', '#a49764');
  
  br('.hint', '4px');
  br('.p', '10px');
  br('input', '7px');
  br('.b.small', '5px');
  
  k = null;
  l = new L();

  l.f();

  $('#load').cl(function(ev) {
    ev.preventDefault();
    var t = $('#title').v() || $('#title').t('placeholder');
    var d = $('#date').v() || $('#date').t('placeholder');
    
    if(new DV(d).v()) {
      l.c(t, d);
    }
  });
  
  $('#resume').cl(function(ev) {
    ev.preventDefault();
    l.c(db.title, db.date);
  });

  $('#back').cl(function(ev) {
    ev.preventDefault();
    l.f();
  });
  
  if(ie) {
    $('.d, .colon, .overlay').c('height','130px');
  }
})($);