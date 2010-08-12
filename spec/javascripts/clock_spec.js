describe("Clock", function() {
  var date = "Oct 5, 2010",
      title = "great clock",
      clock;
      
  beforeEach(function() {
    db = {};
    addClassSpy = spyOn($.fn, 'ac');
    clock = new C(title, date);
  });
  
  describe("#initialize", function() {
    it("stores the date and title in localStorage", function() {
      expect(db.date).toEqual(date);
      expect(db.title).toEqual(title);
    });
    
    it("adds the red class to the second digit in seconds", function() {
      expect(addClassSpy).wasCalled();
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
      var animateSpy = spyOn($.fn, 'a');
      clock.reset();
      expect(window.clearInterval).wasCalled();
      expect(animateSpy).wasCalledWith({ top: 0 });
    });
  });
});