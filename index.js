// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(e => createEmployeeRecord(e))
};

function createTimeInEvent(emRecord, date) {
    let dateAndTime = date.split(' ');
    let recDate = dateAndTime[0];
    let recTime = dateAndTime[1];
    emRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(recTime),
        date: recDate
    });
    return emRecord;
};

function createTimeOutEvent(emRecord, date) {
    let dateAndTime = date.split(' ');
    let recDate = dateAndTime[0];
    let recTime = dateAndTime[1];
    emRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(recTime),
        date: recDate
    });
    return emRecord;
};

const hoursWorkedOnDate = (emRecord, date) => {
    let recIn = emRecord.timeInEvents.find(e => e.date === date);
    let recOut = emRecord.timeOutEvents.find(e => e.date === date);
    let hours = recOut.hour - recIn.hour
    return hours / 100;
};

const wagesEarnedOnDate = (emRecord, date) => {
    return hoursWorkedOnDate(emRecord, date) * emRecord.payPerHour;
};

const allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map((e)=> { return e.date})
    let total = dates.reduce((work, date)=> { return wagesEarnedOnDate(employee, date) + work}, 0)
    return total;
};

const calculatePayroll = (employees) => {
    return employees.reduce((memo, employee) => { return allWagesFor(employee) + memo}, 0);
}

const findEmployeeByFirstName = (arr, firstName) => {
    return arr.find((employee)=> { return employee.firstName === firstName})
}