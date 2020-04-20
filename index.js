// Your code here
const createEmployeeRecord = (arr) => {
    let result = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return result;
};

let employeeRecords = [];
const createEmployeeRecords = (arr) => {
    return arr.map((record) => createEmployeeRecord(record));
};

const createTimeInEvent = (employee, date) => {
    employee.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(date.split(" ")[1], 10),
            date: date.split(" ")[0],

        }
    );
    return employee;
};

const createTimeOutEvent = (employee, date) => {
    employee.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(date.split(" ")[1], 10),
            date: date.split(" ")[0],

        }
    );
    return employee;
};

const hoursWorkedOnDate = (employee, date) => {
    let clockIn = employee.timeInEvents.find( starts => starts.date === date);
    let clockOut = employee.timeOutEvents.find( starts => starts.date === date);
    let work = clockOut.hour - clockIn.hour;
    return work /  100;
};

const wagesEarnedOnDate = (employee, date) => {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
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