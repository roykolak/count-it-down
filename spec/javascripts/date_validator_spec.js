describe("#DateValidator", function() {
  var dateValidator,
      date = "Oct 5, 2010", 
      currentDate = "Aug 8, 2010";
  
  describe("#validate", function() {
    it("returns true when the day difference is less than 100 days and the date is successfully parsed", function() {
      var dateValidator = new DV(date, currentDate);
      expect(dateValidator.v()).toEqual(true);
    });

    it("return false when the day difference is more than 99 days", function() {
      var dateValidator = new DV("Dec 25, 2010", currentDate);
      expect(dateValidator.v()).toEqual(false);
    });
    
    it("return false when the date can not be parsed", function() {
      var dateValidator = new DV("Dec 2fff", currentDate);
      expect(dateValidator.v()).toEqual(false);
    });
  });
});