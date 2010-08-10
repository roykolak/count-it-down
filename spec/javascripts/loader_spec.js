describe("Loader", function() {
  describe("#initialize", function() {
    beforeEach(function() {
      spyOn($.fn, 'height').andReturn(400);
      spyOn($.fn, 'css');
      new Loader();      
    });
    it("dynamically sets the padding top for the section wrapper based on window size", function() {
      expect($.fn.css).wasCalledWith({ paddingTop: 100 });
    });
    
    it("dynamically sets the height of the sections and frame", function() {
      expect($.fn.height).wasCalledWith(400);
    });
  });
  
  describe("#form", function() {
    beforeEach(function() {
      clock = null; // yuck.
    });
    
    it("clears the inputs", function() {
      spyOn($.fn, 'val');
      new Loader().form();
      expect($.fn.val).wasCalledWith('');
    });
    
    it("populars the form with the values in the url when they are available", function() {
      spyOn($, 'urlParam').andReturn('defined!');
      spyOn($.fn, 'val');
      new Loader().form();
      expect($.fn.val).wasCalledWith('defined!');
    });
    
    it("populates the form with default values when there are no params in the url", function() {
      spyOn($, 'urlParam').andReturn(null);
      spyOn($.fn, 'attr');
      new Loader().form();
      expect($.fn.attr).wasCalledWith('placeholder', 'November 5, 2010 13:00');
    });
    
    it("populates the previous clock ui when there is a saved title in the localStorage localStorage", function() {
      localStorage.title = 'test';
      spyOn($.fn, 'text');
      spyOn($.fn, 'show');
      new Loader().form();
      expect($.fn.text).wasCalledWith('test');
      expect($.fn.show).wasCalled();
    });
    
    it("hides the previous clock when there is no stored title in localStorage localStorage", function() {
      localStorage.title = null;
      spyOn($.fn, 'hide');
      new Loader().form();
      expect($.fn.hide).wasCalled();
    });
    
    it("animates to the top", function() {
      spyOn($.fn, 'animate');
      new Loader().form();
      expect($.fn.animate).wasCalledWith({ top: 0 });
    });
    
    it("stops and resets the clock when it is running", function() {
      clock = {
        reset: function() {}
      };
      spyOn(clock, 'reset');
      new Loader().form();
      expect(clock.reset).wasCalled();
    });
  });
  
  describe("#clock", function() {
    var date, title;
    
    beforeEach(function() {
      date = new Date('november 5, 2010');
      title = 'clock title';
    });

    it("sets the end date to the (formatted) passed date value", function() {
      spyOn($.fn, 'text');
      
      new Loader().clock(title, date);
      expect($.fn.text).wasCalledWith(date.toLocaleString());
    });
    
    it("sets the title to the passed title", function() {
      spyOn($.fn, 'text');
      new Loader().clock(title, date);
      expect($.fn.text).wasCalledWith(title);
    });
    
    it("builds the share url with a title and a date", function() {
      spyOn($.fn, 'text');
      spyOn($.fn, 'attr');
      new Loader().clock(title, date);
      expect($.fn.text).wasCalledWith('about:blank?title=' + title + '&date=' + date);
      expect($.fn.attr).wasCalledWith('href', 'about:blank?title=' + title + '&date=' + date);
    });
  });
});