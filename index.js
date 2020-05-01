// Your code here
function createEmployeeRecord(employee){
    let employeeRec ={
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRec;
}

function createEmployeeRecords(eArray){
    
    let eRecord = eArray.map(function(employee){
        let employeeRec ={
            firstName: employee[0],
            familyName: employee[1],
            title: employee[2],
            payPerHour: employee[3],
            timeInEvents: [],
            timeOutEvents: [] 
        };
        return employeeRec;
    });
    return eRecord;
}

function createTimeInEvent(emp, time){
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(`${time.slice(-4)}`, 10),
        date: `${time.slice(0, -5)}`
    });
    return emp;
}

function createTimeOutEvent(emp, time){
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(`${time.slice(-4)}`, 10),
        date: `${time.slice(0, -5)}`
    });
    return emp;
}

function hoursWorkedOnDate(emp, date){
    let cIn = emp.timeInEvents.find(event => event.date === date);
    let cOut = emp.timeOutEvents.find(event => event.date === date);
    let hours = (cOut.hour - cIn.hour)*Math.pow(10, -2);
    return hours;
}

function wagesEarnedOnDate(emp, date){
    let hours = hoursWorkedOnDate(emp, date);
    let pay = hours * emp.payPerHour;
    return pay;
}

function allWagesFor(emp){
    let time = emp.timeInEvents
    let totWage = 0;
    for(let i = 0; i < time.length; i++){
        totWage += wagesEarnedOnDate(emp, time[i].date)
    }
    return totWage;
}

function calculatePayroll(emps){
    let payRoll = 0;
    for(let i = 0; i < emps.length; i++){
        payRoll += allWagesFor(emps[i]);
    }
    return payRoll;
}

function findEmployeeByFirstName(srcArray, firstName){
    let emp = srcArray.find(e => e.firstName == firstName);
    return emp;
}
