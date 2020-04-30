// Your code here

function createEmployeeRecord(arr) {
    const employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}

function createEmployeeRecords(arr) {
    return arr.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(record, time) {
    const timeIn = time.split(" ");
    const timeInEvent = { 
        type: 'TimeIn',
        date: timeIn[0],
        hour: parseInt(timeIn[1], 10) 
    }
    record.timeInEvents.push(timeInEvent);
    return record;
}

function createTimeOutEvent(record, time) {
    const timeOut = time.split(" ");
    const timeOutEvent = { 
        type: 'TimeOut',
        date: timeOut[0],
        hour: parseInt(timeOut[1], 10) 
    }
    record.timeOutEvents.push(timeOutEvent);
    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeOut = record.timeOutEvents.find(x => x.date === date).hour;
    const timeIn = record.timeInEvents.find(x => x.date === date).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
    const rate = record.payPerHour;
    return hoursWorkedOnDate(record, date) * rate;
}

function allWagesFor(record) {
    return record.timeInEvents.map(x => {
        return wagesEarnedOnDate(record, x.date);
    }).reduce((total, x) => total += x);
}

function calculatePayroll(records) {
    return records.map(x => allWagesFor(x)).reduce((total, x) => total += x);
}

function findEmployeeByFirstName(records, name) {
    return records.find(x => x.firstName === name);
}