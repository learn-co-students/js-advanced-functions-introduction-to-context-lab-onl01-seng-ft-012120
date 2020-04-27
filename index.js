// Your code here
// arr = [firstName, familyName, title, payPerHour];
function createEmployeeRecord(arr) {
    return {
         firstName: arr[0],
         familyName: arr[1],
         title: arr[2],
         payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfArrs) {
    // console.log(`arrOfArrs is ${arrOfArrs}`);
     return arrOfArrs.map(e => createEmployeeRecord(e));
    
}

function createTimeInEvent(empRecord, date) {
    let splitDateAndTime = date.split(' ');
    // console.log(`splitdateandtime is ${splitDateAndTime}`);
    // console.log(`time is ${splitDateAndTime[1]}`);
    let dateFromRec = splitDateAndTime[0];
    let timeFromRec = splitDateAndTime[1];
    empRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeFromRec),
        date: dateFromRec
    });

    return empRecord;
}


function createTimeOutEvent(empRecord, date) {
    let splitDateAndTime = date.split(' ');
    let dateFromRec = splitDateAndTime[0];
    let timeFromRec = splitDateAndTime[1];
    empRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeFromRec),
        date: dateFromRec
    });

    return empRecord;
}

function hoursWorkedOnDate(empRecord, dateInput) {
    let recIn = empRecord.timeInEvents.find(e => e.date === dateInput);
    let recOut = empRecord.timeOutEvents.find(e => e.date === dateInput);
    
    // console.log(`rec in is ${recIn}`);
    // should return the timein/out events ?
    // console.log(`${empRecord.timeOutEvents.find(e => e.date === dateInput)}`)   returns [object Object]
    // console.log(`rec in hour is ${recIn.hour}`);
    let timeIn = recIn.hour;
    let timeOut = recOut.hour;
    let hours = (timeOut - timeIn) / 100;
    // console.log(hours);
    return hours;
}

function wagesEarnedOnDate(obj, date) {
    let hours = hoursWorkedOnDate(obj, date);
    let pay = parseInt(obj.payPerHour);
    // console.log(` hours is ${hours}`);
    // console.log(pay);
    return hours * pay
}

function allWagesFor(obj) {
    let allDates = obj.timeInEvents.map(e => e.date);
    // console.log(allDates);
    let wages = allDates.reduce(function(total, element) {
        return wagesEarnedOnDate(obj, element) + total
    },  0);
    // console.log(wages);
    return wages;
}

function findEmployeeByFirstName(srcArray, firstNamey) {
    return srcArray.find(e => e.firstName === firstNamey);
    // console.log(rec);
    // (rec) ? rec : undefined;
}

function calculatePayroll(arr) {
    let totals = arr.reduce(function(total, element) {
        return allWagesFor(element) + total
    }, 0);
    console.log(totals);
    return(totals);
}