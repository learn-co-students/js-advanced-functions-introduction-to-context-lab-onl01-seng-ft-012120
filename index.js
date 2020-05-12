// Your code here

let createEmployeeRecord = function (data) {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

let createEmployeeRecords = function (employeeData) {
  return employeeData.map(function(data) {
    return createEmployeeRecord(data);
  });
};

let createTimeInEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  
  employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    
  return employee;
};

let createTimeOutEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  
  employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    
  return employee;
};

let hoursWorkedOnDate = function (employee, dateToFind) {
  let timeInDay = employee.timeInEvents.find(function(event) {
    return event.date === dateToFind;
  });
  
  let timeOutDay = employee.timeOutEvents.find(function(event) {
    return event.date === dateToFind;
  });
  
  return (timeOutDay.hour - timeInDay.hour)/100;
};

let wagesEarnedOnDate = function (employee, date) {
  let wage = (hoursWorkedOnDate(employee, date) * employee.payPerHour);
  
  return parseFloat(wage);
};

let allWagesFor = function (employee) {
  let validDates = employee.timeInEvents.map(function(event) {
    return event.date;
  });
  
  let pay = validDates.reduce(function(m, date) {
    return (m + wagesEarnedOnDate(employee, date));
  }, 0);
  
  return pay;
};

let findEmployeeByFirstName = function (employeeArray, firstName) {
  return employeeArray.find(function(em) {
    return em.firstName === firstName;
  });
};

let calculatePayroll = function (employeeRec) {
  return employeeRec.reduce(function (mem, record){
    return mem + allWagesFor(record);
  }, 0);
};