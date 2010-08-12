describe("borderRadius", function() {
  it("sets css border radius properties for all browsers on the passed element using the passed pixel value", function() {
    var cssSpy = spyOn($.fn, 'c'); 
    br({}, '2px');
    expect(cssSpy).wasCalledWith('border-radius', '2px');
    expect(cssSpy).wasCalledWith('-moz-border-radius', '2px');
  });
});