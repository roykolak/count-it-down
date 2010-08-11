describe("gradient", function() {
  it("sets css gradient properties for all browsers on the passed element using the passed colors", function() {
    spyOn($.fn, 'css');
    gradient({}, '#CCC', '#DDD');
    expect($.fn.css).wasCalledWith('background', 'linear-gradient(left top, #CCC, #DDD)'); 
    expect($.fn.css).wasCalledWith('background', '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#CCC), to(#DDD))');
    expect($.fn.css).wasCalledWith('background', '-moz-linear-gradient(center top, #CCC, #DDD)');
    expect($.fn.css).wasCalledWith('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='#CCC', endColorstr='#DDD')");
  });
});