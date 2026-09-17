import React from 'react';
import EmployeeForm from '../components/Employee/EmployeeForm';
import EmployeeTable from '../components/Employee/EmployeeTable';

function Employees({
  employees,
  fetchEmployees,
  selectedEmployee,
  setSelectedEmployee,
  handleEmployeeEdit,
  handleEmployeeDelete,
  showNotification,
  currentUser
}) {
  const canWrite = currentUser?.role?.toLowerCase() === 'admin';

  return (
    <main className={`grid ${canWrite ? 'grid-cols-1 lg:grid-cols-[380px_1fr]' : 'grid-cols-1'} gap-8 items-start`}>
      {canWrite && (
        <div className="lg:sticky lg:top-8">
          <EmployeeForm
            onEmployeeAdded={fetchEmployees}
            selectedEmployee={selectedEmployee}
            clearSelection={() => setSelectedEmployee(null)}
            showNotification={showNotification}
          />
        </div>
      )}

      <div className="min-w-0">
        <EmployeeTable
          employees={employees}
          onEdit={handleEmployeeEdit}
          onDelete={handleEmployeeDelete}
          currentUser={currentUser}
        />
      </div>
    </main>
  );
}

export default Employees;
