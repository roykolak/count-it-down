describe("Manager", function() {
  var manager;
  
  beforeEach(function() {
    manager = new Manager('id');
  });
  
  describe("#initialize", function() {
    it("stores to section container", function() {
      expect(manager.container).toBeDefined();
    });
  });
  
  describe("#toClock", function() {
    it("calls jquery animate to move to clock section", function() {
      var toClockSpy = spyOn($.fn, 'animate');
      expect(toClockSpy).toHaveBeenCalled();
    });
  });
});