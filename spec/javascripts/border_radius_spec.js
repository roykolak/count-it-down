describe("borderRadius", function() {
  it("sets css border radius properties for all browsers on the passed element using the passed pixel value", function() {
    spyOn($.fn, 'css'); 
    br({}, '2px');
    expect($.fn.css).wasCalledWith('border-radius', '2px');
    expect($.fn.css).wasCalledWith('-moz-border-radius', '2px');
  });
});