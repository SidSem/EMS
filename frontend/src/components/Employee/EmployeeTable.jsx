import React from 'react'
import EmployeeRow from './EmployeeRow'

function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="table-card">
      <div className="table-header-row">
        <h2>👥 Employee Records</h2>
        <span className="count-badge">{employees.length} Staff Members</span>
      </div>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data-cell">No employee records found.</td>
              </tr>
            ) : (
              employees.map((employee) => (
                <EmployeeRow 
                  key={employee.id} 
                  employee={employee} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeTable;
