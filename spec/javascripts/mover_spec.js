describe("Mover", function() {
  var mover;
  
  beforeEach(function() {
    spyOn($.fn, 'height').andReturn(100);
    mover = new Mover({}, "days");
  });
  
  describe("#initialize", function() {
    it("stores the container and the unit passed", function() {
      expect(mover.container).toEqual({});
      expect(mover.unit).toEqual("days");
    });
    
    it("calculates the height of the number container", function() {
      expect(mover.height).toEqual(100);
    });
    
    it("sets previous time to null", function() {
      expect(mover.previousTime).toEqual(null);
    });
  });
  
  describe("#move", function() {
    var animateSpy;
    
    beforeEach(function() {
      animateSpy = spyOn($.fn, 'animate');
    });

    describe("when animate is called", function() {
      it("calls animate if the time passed is different than the previously passed time", function() {
        mover.move(45);
        expect(animateSpy).wasCalled();
      });

      it("does not call animate if the time passed is the same as the previously passed time", function() {
        mover.previousTime = 45;
        mover.move(45);
        expect(animateSpy).wasNotCalled();
      });
    });
    
    describe("animating when the number is two digits", function() {
      beforeEach(function() {
        mover.previousTime = 44;
        mover.move(43);
      });

      it("calls animate with correct negative top value on first digit", function() { 
        expect(animateSpy.argsForCall[0][0]).toEqual({ top:-400 });
      });
      
      it("calls animate with correct negative top value on second digit", function() {
        expect(animateSpy.argsForCall[1][0]).toEqual({ top:-300 });
      });
    });
    
    describe("animating when the number is one digit", function() {
      it("calls animate with top 0 on first digit", function() {
        mover.previousTime = 6;
        mover.move(5);
        expect(animateSpy.argsForCall[0][0]).toEqual({ top:0 });
      });
      
      it("calls animate with negative top value to move second digit into position", function() {
        mover.previousTime = 6;
        mover.move(5);
        expect(animateSpy.argsForCall[1][0]).toEqual({ top:-500 });
      });
    });
  });
  
  describe("#callback", function() {
    var cssSpy;
    
    beforeEach(function() {
      cssSpy = spyOn($.fn, 'css');
    });
    
    it("calls to css with correct parameters when time multiplied by height is zero", function() {
      mover.callback(0, 100, 10);
      expect(cssSpy).wasCalledWith({ top:-1000 });
    });
    
    it("does not call to css when time multiplied by heigh is greater than zero", function() {
      mover.callback(1, 100, 10);
      expect(cssSpy).wasNotCalled();
    });
  });
});