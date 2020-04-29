// Your code here
function createEmployeeRecord(fourElementArray) {
    return {
        firstName: fourElementArray[0],
        familyName: fourElementArray[1],
        title: fourElementArray[2],
        payPerHour: fourElementArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesArr) {
    return employeesArr.map( function(e) {
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return employee
}

function hoursWorkedOnDate(employee, dateStamp) {
    let timeOut = employee.timeOutEvents.find(element => element.date === dateStamp).hour
    let timeIn = employee.timeInEvents.find(element => element.date === dateStamp).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, dateStamp) {
   return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date)
    const wageArray = dates.map( function(d) {
        return wagesEarnedOnDate(employee, d)
    })
    return wageArray.reduce((memo, e) => memo + e )
}

function findEmployeeByFirstName(employeesArray, firstName) {
    return employeesArray.find(e => e.firstName === firstName)
}

function calculatePayroll(employeesArray) {
    const allWages = employeesArray.map(e => allWagesFor(e))
    return allWages.reduce((memo, e) => memo + e )
}