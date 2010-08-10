describe("Clock", function() {
  var date = "Oct 5, 2010",
      title = "great clock",
      clock;
      
  beforeEach(function() {
    localStorage = {};
    spyOn($.fn, 'addClass');
    clock = new Clock(title, date);
  });
  
  describe("#initialize", function() {
    it("stores the date and title", function() {
      expect(clock.date).toEqual(date);
      expect(clock.title).toEqual(title);
    });
    
    it("stores the date and title in localStorage", function() {
      expect(localStorage.date).toEqual(date);
      expect(localStorage.title).toEqual(title);
    });
    
    it("adds the red class to the second digit in seconds", function() {
      expect($.fn.addClass).wasCalled();
    });
  });
  
  describe("#start", function() {
    it("calls to setInterval", function() {
      spyOn(window, 'setInterval');
      clock.start();
      expect(window.setInterval).wasCalled();
    });
  });
  
  describe("#stop", function() {
    beforeEach(function() {
      audio = {
        pause: function() {}
      };
    });
    it("calls to clearInterval", function() {
      spyOn(window, 'clearInterval');
      clock.stop();
      expect(window.clearInterval).wasCalled();
    });
    
    it("stops the audio", function() {
      spyOn(audio, 'pause');
      clock.stop();
      expect(audio.pause).wasCalled();
    });
  });
  
  describe("#reset", function() {
    it("calls to clearInterval and animates digits to all zeros", function() {
      spyOn(window, 'clearInterval');
      spyOn($.fn, 'animate')
      clock.reset();
      expect(window.clearInterval).wasCalled();
      expect($.fn.animate).wasCalledWith({ top: 0 });
    });
  });
});