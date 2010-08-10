describe("SoundToggler", function() {
  var soundToggler;
  
  describe("#initialize", function() {
    beforeEach(function() {
      spyOn($.fn, 'text');
    });
    
    it("updates toggle button correctly when sound is on", function() {
      localStorage.sound = '1';
      new SoundToggler();
      expect($.fn.text).wasCalledWith('Sound Off');
    });
    
    it("updates toggle button correctly when sound is off", function() {
      localStorage.sound = '0';
      new SoundToggler();
      expect($.fn.text).wasCalledWith('Sound On');
    });
    
    it("turns sound on by default", function() {
      delete(localStorage.sound);
      new SoundToggler();
      expect(localStorage.sound).toEqual('1');
    });
    
    it("leaves sound on if it is already on", function() {
      localStorage.sound = '1';
      new SoundToggler();
      expect(localStorage.sound).toEqual('1');
    });
  });
  
  describe("#toggle", function() {
    beforeEach(function() {
      soundToggler = new SoundToggler();
      spyOn($.fn, 'text');
    });
    
    it("updates text and localStorage setting when turning on", function() {
      localStorage.sound = 0;
      soundToggler.toggle();
      expect($.fn.text).wasCalledWith('Sound Off');
      expect(localStorage.sound).toEqual('1');
    });
    
    it("updates text, localStorage setting, and pauses sound when turning off", function() {
      audio = {
        pause: function() {}
      };
      spyOn(audio, 'pause');
      localStorage.sound = 1;
      soundToggler.toggle();
      expect($.fn.text).wasCalledWith('Sound On');
      expect(localStorage.sound).toEqual('0');
      expect(audio.pause).wasCalled();
    });
  });
});