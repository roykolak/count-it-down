describe("gradient", function() {
  beforeEach(function() {
    spyOn($.fn, 'css');
  });
  
  it("sets css gradient properties for all browsers on the passed element using the passed colors", function() {
    gradient({}, '#CCC', '#DDD');
    expect($.fn.css).wasCalledWith('background', 'linear-gradient(left top, #CCC, #DDD)'); 
    expect($.fn.css).wasCalledWith('background', '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#CCC), to(#DDD))');
    expect($.fn.css).wasCalledWith('background', '-moz-linear-gradient(center top, #CCC, #DDD)');
  });
  
  it("sets a css background color when the browser is internet explorer", function() {
    $.browser.msie = true;
    gradient({}, '#CCC', '#DDD');
    expect($.fn.css).wasCalledWith('background', '#CCC');
  });
});