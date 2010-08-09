describe("#DateValidator", function() {
  var dateValidator,
      date = "Oct 5, 2010", 
      currentDate = "Aug 8, 2010";
      
  describe("#initialize", function() {
    it("stores the date and the current date to validate", function() {
      dateValidator = new DateValidator(date, currentDate);
      expect(dateValidator.date).toEqual(date);
      expect(dateValidator.currentDate).toEqual(currentDate);
    });
  });
  
  describe("#validate", function() {
    it("returns true when the day difference is less than 100 days and the date is successfully parsed", function() {
      var dateValidator = new DateValidator(date, currentDate);
      expect(dateValidator.validate()).toEqual(true);
    });

    it("return false when the day difference is more than 99 days", function() {
      var dateValidator = new DateValidator("Dec 25, 2010", currentDate);
      expect(dateValidator.validate()).toEqual(false);
    });
    
    it("return false when the date can not be parsed", function() {
      var dateValidator = new DateValidator("Dec 2fff", currentDate);
      expect(dateValidator.validate()).toEqual(false);
    });
  });
});