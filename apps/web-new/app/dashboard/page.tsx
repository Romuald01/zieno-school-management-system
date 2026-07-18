'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';

export default function Dashboard() {

  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);


  useEffect(() => {

    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.push('/login');
      return;
    }


    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }


    async function loadDashboardCounts() {

      try {

        const [
          students,
          teachers,
          classes,
          subjects,

        ] = await Promise.all([

          axios.get('https://zieno-api.onrender.com/students'),

          axios.get('https://zieno-api.onrender.com/teachers'),

          axios.get('https://zieno-api.onrender.com/classes'),

          axios.get('https://zieno-api.onrender.com/subjects'),

        ]);


        setStudentCount(students.data.length);

        setTeacherCount(teachers.data.length);

        setClassCount(classes.data.length);

        setSubjectCount(subjects.data.length);


      } catch(error){

        console.error(error);

      }

    }


    loadDashboardCounts();


  }, [router]);



return (

<div
style={{
display:'flex',
minHeight:'100vh',
background:'#f5f7fb',
overflowX:'hidden'
}}
>


<Sidebar />


<main
style={{
flex:1,
minWidth:0
}}
>


<Topbar />


<div
style={{
padding:20,
width:'100%',
boxSizing:'border-box'
}}
>


<div
style={{
display:'flex',
flexWrap:'wrap',
justifyContent:'space-between',
gap:20,
marginBottom:30,
background:'#fff',
padding:25,
borderRadius:15,
boxShadow:'0 5px 15px rgba(0,0,0,.06)'
}}
>


<div>

<h1
style={{
margin:0,
fontSize:34,
color:'#0f172a'
}}
>

Welcome back, {user?.firstName || 'Admin'} 👋

</h1>


<p
style={{
color:'#64748b'
}}
>

School Management Dashboard

</p>


</div>


<div>

<h3>
📅 {new Date().toLocaleDateString()}
</h3>

<p style={{color:'#64748b'}}>
Have a productive day.
</p>


</div>


</div>




<div
style={{
display:'grid',
gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
gap:20,
marginBottom:30
}}
>


<StatCard
title="Students"
value={studentCount.toString()}
icon="👨‍🎓"
color="#2563eb"
/>


<StatCard
title="Teachers"
value={teacherCount.toString()}
icon="👩‍🏫"
color="#16a34a"
/>


<StatCard
title="Classes"
value={classCount.toString()}
icon="🏫"
color="#ea580c"
/>


<StatCard
title="Subjects"
value={subjectCount.toString()}
icon="📚"
color="#9333ea"
/>


</div>




<div
style={{
background:'#fff',
padding:25,
borderRadius:15,
boxShadow:'0 8px 25px rgba(0,0,0,.08)'
}}
>


<h2>
Quick Actions
</h2>


<div
style={{
display:'grid',
gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
gap:15
}}
>


<button
onClick={()=>router.push('/students')}
style={buttonStyle('#2563eb')}
>
👨‍🎓 Add Student
</button>


<button
onClick={()=>router.push('/teachers')}
style={buttonStyle('#16a34a')}
>
👩‍🏫 Add Teacher
</button>


<button
onClick={()=>router.push('/classes')}
style={buttonStyle('#ea580c')}
>
🏫 Create Class
</button>


<button
style={buttonStyle('#9333ea')}
>
📅 Record Attendance
</button>


</div>



<div
style={{
display:'grid',
gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
gap:20,
marginTop:30
}}
>


<div style={boxStyle}>
<h3>Total Users</h3>
<h1>{studentCount + teacherCount}</h1>
</div>


<div style={boxStyle}>
<h3>Current Session</h3>
<h2>2025 / 2026</h2>
</div>


<div style={boxStyle}>
<h3>System Status</h3>

<h2
style={{
color:'#16a34a'
}}
>
● Online
</h2>

</div>


</div>




<h2>
Today's Summary
</h2>


<p>🎓 Total Students: {studentCount}</p>

<p>👩‍🏫 Total Teachers: {teacherCount}</p>

<p>🏫 Total Classes: {classCount}</p>

<p>📚 Total Subjects: {subjectCount}</p>



</div>


</div>


</main>


</div>

);

}



function buttonStyle(color:string){

return {

background:color,

color:'#fff',

border:'none',

padding:'15px',

borderRadius:12,

cursor:'pointer',

fontWeight:'bold',

fontSize:16

};

}



const boxStyle={

background:'#fff',

padding:20,

borderRadius:15,

boxShadow:'0 5px 15px rgba(0,0,0,.08)'

};