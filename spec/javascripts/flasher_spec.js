describe("#Flasher", function() {
  var flasher;
   
  describe("#fin", function() {
    var toggleClassSpy, removeClassSpy;    

    beforeEach(function() {
      toggleClassSpy = spyOn($.fn, 'toggleClass');
      removeClassSpy = spyOn($.fn, 'rc');
    });
    
    describe("when it should not flash", function() {
      it("does not call to toggleClass when the seconds are above 3", function() {
        new F(50, 40, 30, 24).fin();
        expect(toggleClassSpy).wasNotCalled();
        expect(removeClassSpy).wasCalled();
      });
      
      it("does not call to toggleClass when the seconds are below 0", function() {
        new F(50, 40, 30, 29).fin();
        expect(toggleClassSpy).wasNotCalled();
        expect(removeClassSpy).wasCalled();
      });
    });
    
    describe("When it should flash", function() {
      it("calls toggleClass when hours and minutes are 0 and seconds are < 3", function() {
        var selector = new F(0, 0, 0, 2).fin();
        expect(toggleClassSpy).wasCalled();
      });
      
      it("calls toggleClass when minutes equal 0 and seconds are < 3", function() {
        var selector = new F(0, 15, 0, 2).fin();
        expect(toggleClassSpy).wasCalled();
      });
      
      it("calls toggleClass when seconds are < 3", function() {
        var selector = new F(0, 15, 03, 02).fin();
        expect(toggleClassSpy).wasCalled();
      });
      
      it("calls toggleClass when the last digit for seconds is < 3", function() {
        var selector = new F(0, 15, 4, 22).fin();
        expect(toggleClassSpy).wasCalled();
      });
    });
  });
  
  describe("#flashAll", function() {
    var interval;
    
    afterEach(function() {
      clearInterval(interval);
    });
    
    it("starts and returns an interval", function() {
      interval = new F(0, 15, 4, 22).fa();
      expect(typeof(interval)).toEqual('number');
    });
  });
});