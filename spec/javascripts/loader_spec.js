describe("Loader", function() {
  describe("#initialize", function() {
    var cssSpy;
    
    beforeEach(function() {
      spyOn($.fn, 'height').andReturn(400);
      cssSpy = spyOn($.fn, 'c');
      new L();      
    });
    it("dynamically sets the padding top for the section wrapper based on window size", function() {
      expect(cssSpy).wasCalledWith({ paddingTop: 100 });
    });
    
    it("dynamically sets the height of the sections and frame", function() {
      expect($.fn.height).wasCalledWith(400);
    });
  });
  
  describe("#form", function() {
    beforeEach(function() {
      k = null; // yuck.
    });
    
    it("clears the inputs", function() {
      var valSpy = spyOn($.fn, 'v');
      new L().f();
      expect(valSpy).wasCalledWith('');
    });
    
    it("populates the form with default values when there are no params in the url", function() {
      spyOn($, 'u').andReturn(null);
      attrSpy = spyOn($.fn, 't');
      new L().f();
      expect(attrSpy).wasCalledWith('placeholder', 'November 5, 2010 13:00');
    });
    
    it("populates the previous clock ui when there is a saved title in localStorage", function() {
      db.title = 'test';
      var textSpy = spyOn($.fn, 'x');
      spyOn($.fn, 'show');
      new L().f();
      expect(textSpy).wasCalledWith('test');
      expect($.fn.show).wasCalled();
    });
    
    it("hides the previous clock when there is no stored title in localStorage", function() {
      db.title = null;
      spyOn($.fn, 'hide');
      new L().f();
      expect($.fn.hide).wasCalled();
    });
    
    it("animates to the top", function() {
      var animateSpy = spyOn($.fn, 'a');
      new L().f();
      expect(animateSpy).wasCalledWith({ top: 0 });
    });
    
    it("stops and resets the clock when it is running", function() {
      k = {
        reset: function() {}
      };
      spyOn(k, 'reset');
      new L().f();
      expect(k.reset).wasCalled();
    });
  });
  
  describe("#clock", function() {
    var date, title, textSpy;
    
    beforeEach(function() {
      date = new Date('november 5, 2010');
      title = 'clock title';
      textSpy = spyOn($.fn, 'x');
    });

    it("sets the end date to the (formatted) passed date value", function() {
      new L().c(title, date);
      expect(textSpy).wasCalledWith(date.toLocaleString());
    });
    
    it("sets the title to the passed title", function() {
      new L().c(title, date);
      expect(textSpy).wasCalledWith(title);
    });
    
    it("builds the share url with a title and a date", function() {
      var attrSpy = spyOn($.fn, 't');
      new L().c(title, date);
      expect(textSpy).wasCalledWith('about:blank?t=' + title + '&d=' + date);
      expect(attrSpy).wasCalledWith('href', 'about:blank?t=' + title + '&d=' + date);
    });
  });
});