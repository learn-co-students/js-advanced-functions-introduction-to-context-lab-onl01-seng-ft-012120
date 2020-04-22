// Your code here

const createEmployeeRecord = function(record){
    return { firstName: record[0], 
            familyName: record[1], 
            title: record[2], 
            payPerHour: record[3], 
            timeInEvents: [], 
            timeOutEvents: []}
};

const createEmployeeRecords = function(employees){
    return employees.map(createEmployeeRecord);
};

const createTimeInEvent = function(employee, timeIn){
    let timeInEvent = {
        type: 'TimeIn',
        date: timeIn.split(' ')[0],
        hour: parseInt(timeIn.split(' ')[1], 10)
    }
    employee.timeInEvents.push(timeInEvent);
    return employee;
};


const createTimeOutEvent = function(employee, timeOut){
    let timeOutEvent = {
        type: 'TimeOut',
        date: timeOut.split(' ')[0],
        hour: parseInt(timeOut.split(' ')[1], 10)
    }
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
};

const hoursWorkedOnDate = function(employee, date){
    let timeIn = employee.timeInEvents.find(function(e){ return e.date === date }).hour;
    let timeOut = employee.timeOutEvents.find(function(e){ return e.date === date }).hour;
    return (timeOut - timeIn)/100;
};

const wagesEarnedOnDate = function(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
};

const allWagesFor = function(employee){
    const datesWorked = employee.timeInEvents.map(function(e){ return e.date });
    return datesWorked.reduce((accumulator, currentValue) => accumulator + wagesEarnedOnDate(employee, currentValue), 0);
};

const calculatePayroll = function(employees){
    return employees.reduce((accumulator, currentValue) => accumulator + allWagesFor(currentValue), 0);
};

const findEmployeeByFirstName = function(employees, firstName){
    return employees.find((e) => e.firstName === firstName)
};