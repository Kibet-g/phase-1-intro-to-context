// Your code here
// Function to create an employee record
const createEmployeeRecord = (array) => {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  // Function to create multiple employee records
  const createEmployeeRecords = (arrays) => {
    return arrays.map(createEmployeeRecord);
  };
  
  // Function to create a time in event
  const createTimeInEvent = (employeeRecord, dateTime) => {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour)
    });
    return employeeRecord;
  };
  
  // Function to create a time out event
  const createTimeOutEvent = (employeeRecord, dateTime) => {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour)
    });
    return employeeRecord;
  };
  
  // Function to calculate hours worked on a specific date
  const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100; // returns hours as a number
  };
  
  // Function to calculate wages earned on a specific date
  const wagesEarnedOnDate = (employeeRecord, date) => {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  };
  
  // Function to calculate all wages for an employee
  const allWagesFor = (employeeRecord) => {
    const datesWorked = employeeRecord.timeInEvents.map(e => e.date);
    return datesWorked.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  };
  
  // Function to calculate total payroll for multiple employees
  const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  };
  