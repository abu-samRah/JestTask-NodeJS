function fromFormat(dateString, dateFormat) {
    if (!dateString || !dateFormat) {
        throw Error("Wrong Input");
    }
    const dayStartIndex = dateFormat.indexOf("d");
    const dayLastIndex = dateFormat.lastIndexOf("d");
    const monthStartIndex = dateFormat.indexOf("m");
    const monthLastIndex = dateFormat.lastIndexOf("m");
    const yearStartIndex = dateFormat.indexOf("y");
    const yearLastIndex = dateFormat.lastIndexOf("y");

    if (monthStartIndex == -1 || dayStartIndex == -1 || yearStartIndex == -1) {
        throw Error("Wrong Input");
    }


    const startIndex = Math.min(dayStartIndex, monthStartIndex, yearStartIndex);
    const endIndex = Math.max(dayLastIndex, monthLastIndex, yearLastIndex);
    const afterSliceDateFormat = dateFormat.slice(0, startIndex) + dateFormat.slice(endIndex + 1, dateFormat.length);
    const afterSliceDateString = dateString.slice(0, startIndex) + dateString.slice(endIndex + 4, dateString.length);

    finalDate = {}
    finalDate["year"] = (dateString.slice(yearStartIndex, yearLastIndex + 4));
    const isNumOnly = /^\d+$/.test(finalDate["year"])

    if (afterSliceDateFormat != afterSliceDateString || finalDate["year"].length != 4 || !isNumOnly) {
        throw Error("Wrong Input");
    }

    finalDate["year"] = Number(finalDate["year"]);


    if (yearStartIndex > dayStartIndex && yearStartIndex < monthStartIndex) {

        finalDate["day"] = Number(dateString.slice(dayStartIndex, dayLastIndex + 1));
        finalDate["month"] = Number(dateString.slice(monthStartIndex + 3, monthLastIndex + 4));

    } else if (yearStartIndex > monthStartIndex && yearStartIndex < dayStartIndex) {

        finalDate["day"] = Number(dateString.slice(dayStartIndex + 3, dayLastIndex + 4));
        finalDate["month"] = Number(dateString.slice(monthStartIndex, monthLastIndex + 1));

    } else if (yearStartIndex < monthStartIndex && yearStartIndex < dayStartIndex) {

        finalDate["day"] = Number(dateString.slice(dayStartIndex + 3, dayLastIndex + 4));
        finalDate["month"] = Number(dateString.slice(monthStartIndex + 3, monthLastIndex + 4));

    } else {
        finalDate["day"] = Number(dateString.slice(dayStartIndex, dayLastIndex + 1));
        finalDate["month"] = Number(dateString.slice(monthStartIndex, monthLastIndex + 1));
    }



    return new Date(finalDate.year, finalDate.month - 1, finalDate.day).toString();
}


String.prototype.replaceBetween = function(start, end, str) {
    return this.substring(0, start) + str + this.substring(end);
};

String.prototype.getPosition = function(subString, index) {
    return this.split(subString, index).join(subString).length;
}




function format(dateObject, outputFormat) {
    if (!dateObject || !outputFormat) {
        throw Error("Wrong Input");
    }

    const monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsAbbrevName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();

    const dayStartIndex = outputFormat.toLowerCase().indexOf("d");
    const dayLastIndex = outputFormat.toLowerCase().lastIndexOf("d");
    const monthStartIndex = outputFormat.indexOf("M");
    const monthLastIndex = outputFormat.lastIndexOf("M");
    const yearStartIndex = outputFormat.toLowerCase().indexOf("y");
    const yearLastIndex = outputFormat.toLowerCase().lastIndexOf("y");



    if (monthStartIndex == -1 || dayStartIndex == -1 || yearStartIndex == -1) {
        throw Error("Wrong Input");
    }

    const dayIndexDiff = dayLastIndex - dayStartIndex;
    const dayFinal = dayIndexDiff == 0 || (dayIndexDiff == 1 && day > 9) ? day : (dayIndexDiff == 1 && day < 10 ? "0" + day : "Wrong Day");

    const monthIndexDiff = monthLastIndex - monthStartIndex;
    const monthFinal = monthIndexDiff == 0 || (monthIndexDiff == 1 && month > 9) ? month + 1 : (monthIndexDiff == 1 && month < 10 ? "0" + (month + 1) : (monthIndexDiff == 2 ? monthsAbbrevName[month] : (monthIndexDiff == 3 ? monthsFullName[month] : "Wrong Month")));

    const yearIndexDiff = yearLastIndex - yearStartIndex;
    const yearFinal = yearIndexDiff == 0 || (yearIndexDiff == 3) ? year : (yearIndexDiff == 1 ? year % 100 : "Wrong Year");

    const errormessage = dayFinal == "Wrong Day" ? dayFinal : (monthFinal == "Wrong Month" ? monthFinal : (yearFinal == "Wrong Year" ? "Wrong Year" : "No Errors"));
    if (errormessage != "No Errors") {
        throw Error(errormessage);
    }

    const replacemonth = outputFormat.replaceBetween(monthStartIndex, monthLastIndex + 1, monthFinal);

    const dayStartReplaceIndex = replacemonth.toLowerCase().indexOf("d");
    const dayEndReplaceIndex = replacemonth.toLowerCase().lastIndexOf("d");

    const replaceday = replacemonth.replaceBetween(dayStartReplaceIndex, dayEndReplaceIndex + 1, dayFinal);


    let yearStartReplaceIndex = 0;
    let yearEndReplaceIndex = 0;


    if ((yearStartIndex > monthStartIndex) && (monthFinal == "January" || monthFinal == "February" || monthFinal == "May" || monthFinal == "July")) {
        yearStartReplaceIndex = replaceday.toLowerCase().getPosition("y", 2);
        yearEndReplaceIndex = replaceday.toLowerCase().lastIndexOf("y");
    } else {
        yearStartReplaceIndex = replaceday.toLowerCase().indexOf("y");
        yearEndReplaceIndex = yearIndexDiff == 3 ? replaceday.toLowerCase().getPosition("y", 4) : (yearIndexDiff == 1 ? replaceday.toLowerCase().getPosition("y", 2) : yearStartReplaceIndex);
    }



    const finalReplace = replaceday.replaceBetween(yearStartReplaceIndex, yearEndReplaceIndex + 1, yearFinal)
    return finalReplace;


}




module.exports = {
    fromFormat: fromFormat,
    format: format,
};