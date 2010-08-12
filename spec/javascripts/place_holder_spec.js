describe("PlaceHolder", function() {
  describe("#initialize", function() {
    it("attaches a blur and focus event", function() {
      spyOn($.fn, 'blur');
      spyOn($.fn, 'focus');
      new PH({});
      expect($.fn.blur).wasCalled();
      expect($.fn.focus).wasCalled();
    });
    
    it("sets the value of the input to be the placeholder text and adds a class of placeholder when it has no value", function() {
      var valSpy = spyOn($.fn, 'v').andReturn('');
      var addClassSpy = spyOn($.fn, 'ac');
      spyOn($.fn, 't').andReturn('this is the placeholder');
      new PH({});
      expect(addClassSpy).wasCalledWith('placeholder');
      expect(valSpy).wasCalledWith('this is the placeholder');
    });
  });
});