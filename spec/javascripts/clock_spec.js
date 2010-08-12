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
      var setIntervalSpy = spyOn(window, 'sI');
      clock.start();
      expect(setIntervalSpy).wasCalled();
    });
  });
  
  describe("#stop", function() {
    it("calls to clearInterval", function() {
      var clearIntervalSpy = spyOn(window, 'cI');
      clock.stop();
      expect(clearIntervalSpy).wasCalled();
    });
  });
  
  describe("#reset", function() {
    it("calls to clearInterval and animates digits to all zeros", function() {
      var clearIntervalSpy = spyOn(window, 'cI');
      var animateSpy = spyOn($.fn, 'a');
      clock.reset();
      expect(clearIntervalSpy).wasCalled();
      expect(animateSpy).wasCalledWith({ top: 0 });
    });
  });
});