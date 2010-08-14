describe("gradient", function() {
  var cssSpy;
  
  beforeEach(function() {
    cssSpy = spyOn($.fn, 'c');
  });
  
  it("sets css gradient properties for all browsers on the passed element using the passed colors", function() {
    g({}, '#CCC', '#DDD');
    expect(cssSpy).wasCalledWith('background', 'linear-gradient(left top, #CCC, #DDD)'); 
    expect(cssSpy).wasCalledWith('background', '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#CCC), to(#DDD))');
    expect(cssSpy).wasCalledWith('background', '-moz-linear-gradient(center top, #CCC, #DDD)');
  });
});