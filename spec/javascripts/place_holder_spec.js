describe("PlaceHolder", function() {
  describe("#initialize", function() {
    it("attaches a blur and focus event", function() {
      spyOn($.fn, 'blur');
      spyOn($.fn, 'focus');
      new PlaceHolder({});
      expect($.fn.blur).wasCalled();
      expect($.fn.focus).wasCalled();
    });
    
    it("sets the value of the input to be the placeholder text and adds a class of placeholder when it has no value", function() {
      spyOn($.fn, 'val').andReturn('');
      spyOn($.fn, 'addClass');
      spyOn($.fn, 'attr').andReturn('this is the placeholder');
      new PlaceHolder({});
      expect($.fn.addClass).wasCalledWith('placeholder');
      expect($.fn.val).wasCalledWith('this is the placeholder');
    });
  });
});