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
    return employees.map(x => createEmployeeRecord(x))
}

const createTimeInEvent = function(employee, datetime){
    let timeInEvent = {
        type: "TimeIn", 
        hour: parseInt(datetime.split(' ')[1], 10),  
        date: datetime.split(' ')[0]
    }
 employee.timeInEvents.push(timeInEvent)
 return employee
}

const createTimeOutEvent = function(employee, datetime){
    let timeOutEvent = {
        type: "TimeOut", 
        hour: parseInt(datetime.split(' ')[1], 10),  
        date: datetime.split(' ')[0]
    }
 employee.timeOutEvents.push(timeOutEvent)
 return employee
}

const hoursWorkedOnDate = function(obj, dates){
    let timeOut = obj.timeOutEvents.find(function(e) { return e.date === dates}).hour;
     let timeIn = obj.timeInEvents.find(function(e) { return e.date === dates}).hour;
     return (timeOut-timeIn)/100;
}

const wagesEarnedOnDate = function(obj, dates) {
    let hours = hoursWorkedOnDate(obj, dates)
    let payrate = obj.payPerHour
    return hours * payrate
}

const allWagesFor = function(employee){
   let dates =  employee.timeOutEvents.map(function(e) {return e.date})
   return dates.reduce((accum, oneday) => accum + wagesEarnedOnDate(employee,oneday), 0)
   
}

const calculatePayroll = function(arr){
    
    return arr.reduce((accum, one) => accum + allWagesFor(one), 0)
}

const findEmployeeByFirstName = function(arr, name){
   return arr.find((e) => e.firstName === name)
} 