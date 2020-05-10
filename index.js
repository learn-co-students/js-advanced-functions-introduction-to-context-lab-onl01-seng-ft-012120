// Your code here
function createEmployeeRecord(e) {

        let o = {
            firstName: e[0],
            familyName: e[1],
            title: e[2],
            payPerHour: e[3],
            timeInEvents: [],
            timeOutEvents: []
        }
      return o
    }

    function createEmployeeRecords(arr) {
        let newArr = []
            arr.map(e => {
                let o = createEmployeeRecord(e)
                newArr.push(o)
            })
        return newArr
        }

    function createTimeInEvent(obj, str) {
        let arr = str.split(' ')
        let o = {
            type: "TimeIn",
            date: arr[0],
            hour: parseInt(arr[1],10)
        }
        obj.timeInEvents.push(o)

        return obj
    }

    function createTimeOutEvent(obj, str) {
        let arr = str.split(' ')
        let o = {
            type: "TimeOut",
            date: arr[0],
            hour: parseInt(arr[1], 10)
        }
        obj.timeOutEvents.push(o)

        return obj
    }

    function hoursWorkedOnDate(obj, d) {
       
        let timeIn = obj.timeInEvents.find((e) => e.date === d).hour
        let timeOut = obj.timeOutEvents.find((e) => e.date === d).hour
        
     return (timeOut - timeIn) /100
  
    }

    function wagesEarnedOnDate(obj, d) {
        let hours = hoursWorkedOnDate(obj, d)
        return obj.payPerHour * hours
    }

    function allWagesFor(obj) {
        let allDates =[] 
        let allWages = []
        obj.timeInEvents.map(e => {
            allDates.push(e.date)
        })

        allDates.map(d => {
       allWages.push((hoursWorkedOnDate(obj, d)) * obj.payPerHour)
        })  

    return allWages.reduce((total, wage) => {
        return total + wage
    },0);
}

function findEmployeeByFirstName(arr, name) {
    let employee;
    arr.find(obj => {
        if (obj.firstName == name) {
            employee = obj                
        }
    })
    return employee
}


function calculatePayroll(employees) {
            let allWages = []
        employees.map((e) => {
       allWages.push(allWagesFor(e));
    })

   return allWages.reduce((total, wage) => {
            return total + wage;
    },0);

}


    