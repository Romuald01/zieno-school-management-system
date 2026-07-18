'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StudentForm from '../components/StudentForm';
import ActionButton from '../components/ActionButton';
import TableContainer from '../components/TableContainer';

export default function StudentsPage() {

  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingStudent, setEditingStudent] = useState<any>(null);


  async function loadStudents() {
    try {
      const response = await axios.get(
        'https://zieno-api.onrender.com/students'
      );

      setStudents(response.data);

    } catch (error) {
      console.error(error);
    }
  }


  async function deleteStudent(id: string) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmDelete) return;


    try {

      await axios.delete(
        `https://zieno-api.onrender.com/students/${id}`
      );

      loadStudents();

    } catch (error) {

      console.error(error);
      alert('Failed to delete student.');

    }
  }


  useEffect(() => {
    loadStudents();
  }, []);



  return (

    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f8fafc',
      }}
    >

      <Sidebar />


      <main
        style={{
          flex: 1,
          overflowX: 'hidden',
        }}
      >

        <Topbar />


        <div
          style={{
            padding: 20,
          }}
        >


          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              marginBottom: 20,
            }}
          >

            {showForm ? 'Close Form' : '+ Add Student'}

          </button>



          {showForm && (

            <StudentForm
              student={editingStudent}

              onSuccess={() => {

                loadStudents();
                setEditingStudent(null);
                setShowForm(false);

              }}

            />

          )}




          <h1
            style={{
              fontSize: 32,
              marginBottom: 5,
            }}
          >
            Students
          </h1>



          <p
            style={{
              color: '#777',
              marginBottom: 30,
            }}
          >
            Manage all registered students
          </p>




          <div
            style={{
              marginBottom: 20,
              fontWeight: 'bold',
              color: '#2563eb',
            }}
          >

            Total Students: {students.length}

          </div>




          <input

            type="text"

            placeholder="Search student..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            style={{

              width: '100%',

              maxWidth: 320,

              padding: 12,

              borderRadius: 6,

              border: '1px solid #ccc',

              marginBottom: 20,

            }}

          />




          <TableContainer>


            <table

              style={{

                width: '100%',

                minWidth: 900,

                borderCollapse: 'collapse',

              }}

            >


              <thead

                style={{

                  background:'#2563eb',

                  color:'white',

                }}

              >

                <tr>

                  <th style={{padding:12}}>
                    Admission No
                  </th>

                  <th style={{padding:12}}>
                    Name
                  </th>

                  <th style={{padding:12}}>
                    Gender
                  </th>

                  <th style={{padding:12}}>
                    Parent
                  </th>

                  <th style={{padding:12}}>
                    Phone
                  </th>

                  <th style={{padding:12}}>
                    Actions
                  </th>

                </tr>

              </thead>



              <tbody>


              {
                students

                .filter((student)=>


                  `${student.firstName} ${student.lastName} ${student.admissionNo}`

                  .toLowerCase()

                  .includes(search.toLowerCase())


                )

                .map((student)=>(


                  <tr

                    key={student.id}

                    style={{

                      borderBottom:'1px solid #e5e7eb'

                    }}

                  >


                    <td style={{padding:12}}>
                      {student.admissionNo}
                    </td>


                    <td style={{padding:12}}>
                      {student.firstName} {student.lastName}
                    </td>


                    <td style={{padding:12}}>
                      {student.gender}
                    </td>


                    <td style={{padding:12}}>
                      {student.parentName}
                    </td>


                    <td style={{padding:12}}>
                      {student.parentPhone}
                    </td>



                    <td style={{
                      padding:12,
                      textAlign:'center'
                    }}>


                      <ActionButton

                        text="Edit"

                        color="#2563eb"

                        onClick={()=>{

                          setEditingStudent(student);

                          setShowForm(true);

                        }}

                      />



                      <ActionButton

                        text="Delete"

                        color="#dc2626"

                        onClick={()=>deleteStudent(student.id)}

                      />


                    </td>


                  </tr>


                ))

              }


              </tbody>


            </table>


          </TableContainer>



        </div>


      </main>


    </div>

  );

}