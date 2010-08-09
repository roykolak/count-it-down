describe("DateDifference", function() {
  var dateDifference;
  
  beforeEach(function() {
    dateDifference = new DateDifference(new Date('November 05, 2010 5:00'));
  });
  
  describe("#differenceBetween", function() {
    var difference;
                          
    beforeEach(function() {  
      difference = dateDifference.between(new Date('aug 7, 2010 13:01:45'));
    });

    it("returns the day difference", function() {
      expect(difference.days).toEqual(89);
    });

    it("returns the hour difference", function() {
      expect(difference.hours).toEqual(15);
    });
    
    it("returns the minute difference", function() {
      expect(difference.minutes).toEqual(58);
    });
    
    it("returns the second difference", function() {
      expect(difference.seconds).toEqual(15);
    });

  });
});