let createEmployeeRecord = function(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeData) {
  return employeeData.map(function(employee) {
    return createEmployeeRecord(employee)
  })
}

let createTimeInEvent = function(employee,dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour,10),
    date,
  })
  return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
  let[date,hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour,10),
    date,
  })
  return employee
}

let hoursWorkedOnDate = function(employee, hours) {
  let timeIn = employee.timeInEvents.find(function(timeWorked) {
    return timeWorked.date === hours
  })

  let timeOut = employee.timeOutEvents.find(function(timeOut){
    return timeOut.date === hours
  })
  return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, dates) {
  let pay = hoursWorkedOnDate(employee, dates)
  return pay * employee.payPerHour
}

let allWagesFor = function(employee) {
  let totalWages = employee.timeInEvents.map(function(dates) {
    return dates.date
  })

  let payable = totalWages.reduce(function(checks, dates) {
    return checks + wagesEarnedOnDate(employee,dates)
  }, 0)
  return payable
}

let calculatePayroll = function(employees) {
  return employees.reduce(function(checks, employee) {
    return checks + allWagesFor(employee)
  }, 0)
}

let findEmployeeByFirstName = function(employees,name) {
  return employees.find(function(employee) {
      return employee.firstName === name
  })
}

