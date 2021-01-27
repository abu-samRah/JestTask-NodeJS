const dates = require('./datesFunctions.js');

describe('Testing fromFormat function', () => {
    const expected = "Thu Dec 10 2009 00:00:00 GMT+0300 (Arabian Standard Time)"


    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("10/12/2009", "dd/mm/y");
        expect(result).toEqual(expected);
    });

    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("10/12/2009", "dd-mm-y");
        expect(result).toEqual(expected);
    });

    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("2009/12/10", "y/mm/dd");
        expect(result).toEqual(expected);
    });

    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("12/2009/10", "mm/y/dd");
        expect(result).toEqual(expected);
    });

    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("2009/10/12", "y/dd/mm");
        expect(result).toEqual(expected);
    });

    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("10/2009/12", "dd/y/mm");
        expect(result).toEqual(expected);
    });

    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("hi, 10/12/2009", "hi, dd/mm/y");
        expect(result).toEqual(expected);
    });

    test('Should return valid date object when passing valid date format', () => {
        let result = dates.fromFormat("hi7777, 10/12/2009xx", "hi7777, dd/mm/yxx");
        expect(result).toEqual(expected);
    });

    test('Should return error message', () => {
        let expected = "Wrong Input";
        let result = () => dates.fromFormat("10/12/2", "dd/mm/y");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        let expected = "Wrong Input";
        let result = () => dates.fromFormat("hi77, 10/12/2009", "hi, dd/mm/y");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        let expected = "Wrong Input"
        let result = () => dates.fromFormat("10/12/209", "dd/mm/y");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        let expected = "Wrong Input"
        let result = () => dates.fromFormat("10/12/2", "dd/mm/y");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {

        expect(() => dates.fromFormat()).toThrowError("Wrong Input");
    });



});


describe('Testing format function', () => {
    const format = dates.format;
    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "01-27/2021"
        const result = format(new Date(), "MM-DD/YYYY");
        expect(result).toEqual(expected);
    });

    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "Jan-27/2021"
        const result = format(new Date(), "MMM-D/YYYY");
        expect(result).toEqual(expected);
    });

    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "2021-27/January"
        const result = format(new Date(), "YYYY-D/MMMM");
        expect(result).toEqual(expected);
    });

    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "27/2021-January"
        const result = format(new Date(), "D/YYYY-MMMM");
        expect(result).toEqual(expected);
    });

    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "27/21-January"
        const result = format(new Date(), "D/YY-MMMM");
        expect(result).toEqual(expected);
    });

    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "21/27/-January"
        const result = format(new Date(), "YY/D/-MMMM");
        expect(result).toEqual(expected);
    });

    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "HI: 21/27/-January"
        const result = format(new Date(), "HI: YY/D/-MMMM");
        expect(result).toEqual(expected);
    });

    test('Should return a date formatted string when passing valid date object', () => {
        const expected = "2021/27/-January"
        const result = format(new Date(), "Y/D/-MMMM");
        expect(result).toEqual(expected);
    });

    test('Should return error message', () => {
        const expected = "Wrong Input"
        const result = () => format(new Date(), "HI: YY/xx/-MMMM");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        const expected = "Wrong Month"
        const result = () => format(new Date(), "HI: My/DD/-MMMM");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        const expected = "Wrong Day"
        const result = () => format(new Date(), "y/DDD/-MMMM");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        const expected = "Wrong Year"
        const result = () => format(new Date(), "yyy/DD/-MMMM");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        const expected = "Wrong Month"
        const result = () => format(new Date(), "yyy/DD/-MMMMM");
        expect(result).toThrowError(expected);
    });

    test('Should return error message', () => {
        const expected = "Wrong Input"
        const result = () => format();
        expect(result).toThrowError(expected);
    });


});