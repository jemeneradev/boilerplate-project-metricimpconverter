/*
*
*
*       Complete the handler logic below
*       
*       
*/

const numCategory = (input) => {
  let numresults = /(\d+(([./])\d+)?)/.exec(input)
  if (numresults[3] === ".") {
      return {
          "t": "real",
          v: parseFloat(numresults[1])
      }
  } else if (numresults[3] === '/') {
      return null //parseFloat(numresults[2]/parseFloat(numresults[5]))
  }
  return {
      t: "whole",
      v: parseInt(numresults[1])
  }
}

function ConvertHandler() {
  this.getNum = function(input) {
      //[1]=num
      //[2]=unit
      let inputSplitter = /([0-9./]+)([a-z]+)/gi
      let results = inputSplitter.exec(input);
      if (results === null) {
          return 1
      }

      //[5]=fraction
      let numformat = /((\d+([.]\d+)?)(([/])(\d+([.]\d+)?))?)/
      let numResults = numformat.exec(input);
      //console.log(,numResults)
      if (numResults[0].length === numResults.input.length - results[2].length) { //matched the entire string and not just a sub 
          if (numResults[5] === "/") {
              //console.log(numCategory(numResults[2]).v/numCategory(numResults[6]).v)
              return (numCategory(numResults[2]).v) / (numCategory(numResults[6]).v)
          } else if (numResults[6] === undefined && numResults[2] != undefined) {
              return numCategory(numResults[2]).v
          }
      }
      return null
  };

  this.getUnit = function(input) {
      let found =  /([a-z]+)$/gi.exec(input)[1]
      let extracted = found.toLowerCase()
      return ['gal', 'l', 'mi', 'km', 'lbs', 'kg'].indexOf(extracted) !== -1 ? found : null
  };

  this.getReturnUnit = function(initUnit) {
      switch (initUnit.toLowerCase()) {
          case 'gal': {
              return 'l';
          }
          case 'l': {
              return 'gal';
          }
          case 'mi': {
              return 'km';
          }
          case 'km': {
              return 'mi';
          }
          case 'lbs': {
              return 'kg';
          }
          case 'kg': {
              return 'lbs';
          }
          default: {
              return null;
          }
      }
  }

  const capitalize = (word) => {
      return word[0].toUpperCase() + word.slice(1)
  }
  this.spellOutUnit = function(unit, count=2) {
    switch (unit) {
        case 'gal': {
            return 'gallon' + ((count > 1) ? 's' : '')
        }
        case 'l': {
            return 'liter' + ((count > 1) ? 's' : '')
        }
        case 'lbs': {
            return 'pound' + ((count > 1) ? 's' : '')
        }
        case 'km': {
            return 'kilometer' + ((count > 1) ? 's' : '')
        }
        case 'kg': {
            return 'kilogram' + ((count > 1) ? 's' : '')
        }
        case 'mi': {
            return 'mile' + ((count > 1) ? 's' : '')
        }
    }
}

  this.convert = function(initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      const precision = 5

      switch (initUnit.toLowerCase()) {
          case 'gal': {
            return parseFloat((initNum * galToL).toFixed(precision));
          };
          case 'l': {
            return parseFloat((initNum / galToL ).toFixed(precision));
          };
          case 'lbs': {
            return parseFloat((initNum * lbsToKg ).toFixed(precision));
          };
          case 'kg': {
            return parseFloat((initNum / lbsToKg ).toFixed(precision));
          };
          case 'mi': {
            return parseFloat((initNum * miToKm ).toFixed(precision));
          };
          case 'km': {
            return parseFloat((initNum / miToKm ).toFixed(precision));
          };
          default: {
            return null
          }
      }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      return `${initNum} ${this.spellOutUnit(initUnit,initNum)} converts to ${returnNum} ${this.spellOutUnit(returnUnit,returnNum)}`;
  };

}

module.exports = ConvertHandler;
