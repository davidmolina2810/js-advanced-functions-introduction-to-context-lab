const createEmployeeRecord = (empArr) => {
  let employee = {
    "firstName":empArr[0],
    "familyName":empArr[1],
    "title":empArr[2],
    "payPerHour":empArr[3],
    "timeInEvents":[],
    "timeOutEvents":[]
  }
  return employee
}

const createEmployeeRecords = (arrOfEmployees) => {
  return arrOfEmployees.map(empArr => createEmployeeRecord(empArr))
}

const createTimeInEvent = (empRecord, dateTime) => {
  let sliceAt = dateTime.indexOf(" ")
  const date = dateTime.slice(0, sliceAt)
  const hour = parseInt(dateTime.slice(sliceAt + 1))
  const newEvent = {
    "type":"TimeIn",
    "date":date,
    "hour":hour
  }
  empRecord.timeInEvents.push(newEvent)
  return empRecord
}

const createTimeOutEvent = (empRecord, dateTime) => {
  let sliceAt = dateTime.indexOf(" ")
  const date = dateTime.slice(0, sliceAt)
  const hour = parseInt(dateTime.slice(sliceAt + 1))
  const newEvent = {
    "type":"TimeOut",
    "date":date,
    "hour":hour
  }
  empRecord.timeOutEvents.push(newEvent)
  return empRecord
}

const hoursWorkedOnDate = (empRecord, date) => {
  const dateTimeIn = empRecord.timeInEvents.find(event => event.date === date)
  const dateTimeOut = empRecord.timeOutEvents.find(event => event.date === date)
  const timeIn = dateTimeIn.hour
  const timeOut = dateTimeOut.hour
  const hoursWorked = timeOut - timeIn
  return hoursWorked / 100
}

const wagesEarnedOnDate = (empRecord, date) => {
  const empWage = empRecord.payPerHour
  const hoursWorked = hoursWorkedOnDate(empRecord, date)
  return empWage * hoursWorked
}

const allWagesFor = (empRecord) => {
  const workDays = empRecord.timeInEvents.map(event => event.date)
  const hoursPerWorkDay = workDays.map(date => hoursWorkedOnDate(empRecord, date))
  const totalHours = hoursPerWorkDay.reduce((acc, current) => acc + current)
  const empWage = empRecord.payPerHour
  return totalHours * empWage
}

const calculatePayroll = (employees) => {
  return employees.reduce((x, c) => x + allWagesFor(c), 0)
}

const findEmployeeByFirstName = (employees, name) => {
  return employees.find(employee => employee.firstName === name)
}