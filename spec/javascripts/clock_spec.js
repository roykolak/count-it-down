describe("Clock", function() {
  var date = "Oct 5, 2010",
      title = "great clock",
      clock;
      
  beforeEach(function() {
    db = {};
    spyOn($.fn, 'addClass');
    clock = new Clock(date, title);
  });
  
  describe("#initialize", function() {
    it("stores the date and title", function() {
      expect(clock.date).toEqual(date);
      expect(clock.title).toEqual(title);
    });
    
    it("stores the date and title in localStorage", function() {
      expect(db.date).toEqual(date);
      expect(db.title).toEqual(title);
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
    it("calls to clearInterval", function() {
      spyOn(window, 'clearInterval');
      clock.stop();
      expect(window.clearInterval).wasCalled();
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