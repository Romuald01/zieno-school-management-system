'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ClassForm from '../components/ClassForm';
import ActionButton from '../components/ActionButton';
import TableContainer from '../components/TableContainer';


export default function ClassesPage() {

  const [classes, setClasses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);


  async function loadClasses() {

    try {

      const response = await axios.get(
        'https://zieno-api.onrender.com/classes'
      );

      setClasses(response.data);

    } catch(error){

      console.error(error);

    }

  }



  async function deleteClass(id:string){

    const confirmDelete = confirm(
      'Delete this class?'
    );


    if(!confirmDelete) return;


    try{

      await axios.delete(
        `https://zieno-api.onrender.com/classes/${id}`
      );

      loadClasses();


    }catch(error){

      console.error(error);

    }

  }




  useEffect(()=>{

    loadClasses();

  },[]);




  const filteredClasses = classes.filter((item)=>{

    return (
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.arm?.toLowerCase().includes(search.toLowerCase()) ||
      item.level?.toLowerCase().includes(search.toLowerCase())
    );

  });





return (

<div
style={{
display:'flex',
minHeight:'100vh',
background:'#f8fafc',
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
alignItems:'center',
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
fontSize:32,
color:'#0f172a'
}}
>
🏫 Classes
</h1>


<p
style={{
color:'#64748b',
marginTop:8
}}
>
Manage all school classes
</p>


</div>




<button
onClick={()=>{

setEditingClass(null);
setShowForm(!showForm);

}}
style={{

background:'#ea580c',

color:'#fff',

border:'none',

padding:'14px 22px',

borderRadius:10,

cursor:'pointer',

fontWeight:'bold',

fontSize:15

}}
>

{showForm ? 'Close Form' : '+ Add Class'}

</button>



</div>





<input

placeholder="🔍 Search class..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

style={{

width:'100%',

padding:15,

boxSizing:'border-box',

borderRadius:10,

border:'1px solid #ddd',

marginBottom:25,

fontSize:15

}}

/>






{showForm && (

<div
style={{

background:'#fff',

padding:25,

borderRadius:15,

boxShadow:'0 5px 15px rgba(0,0,0,.08)',

marginBottom:30

}}
>


<ClassForm

classItem={editingClass}

onSuccess={()=>{

loadClasses();

setShowForm(false);

setEditingClass(null);

}}

/>


</div>

)}







<div
style={{

background:'#fff',

padding:20,

borderRadius:12,

boxShadow:'0 5px 20px rgba(0,0,0,.08)'

}}
>



<TableContainer>


<table

style={{

width:'100%',

minWidth:700,

borderCollapse:'collapse'

}}

>



<thead>

<tr
style={{
background:'#f8fafc'
}}
>


<th style={thStyle}>
Class
</th>


<th style={thStyle}>
Arm
</th>


<th style={thStyle}>
Level
</th>


<th style={thStyle}>
Action
</th>


</tr>

</thead>




<tbody>


{filteredClasses.map((classItem)=>(


<tr key={classItem.id}>


<td style={tdStyle}>
{classItem.name}
</td>



<td style={tdStyle}>
{classItem.arm}
</td>



<td style={tdStyle}>
{classItem.level}
</td>



<td style={tdStyle}>


<div
style={{
display:'flex',
gap:10,
flexWrap:'wrap'
}}
>


<ActionButton

text="Edit"

color="#2563eb"

onClick={()=>{

setEditingClass(classItem);

setShowForm(true);

}}

/>



<ActionButton

text="Delete"

color="#dc2626"

onClick={()=>deleteClass(classItem.id)}

/>



</div>


</td>



</tr>


))}




{filteredClasses.length===0 && (

<tr>

<td

colSpan={4}

style={{

padding:30,

textAlign:'center',

color:'#777'

}}

>

No classes found.

</td>

</tr>

)}



</tbody>


</table>


</TableContainer>



</div>



</div>


</main>


</div>


);

}




const thStyle={

padding:18,

textAlign:'left' as const,

borderBottom:'2px solid #e5e7eb'

};



const tdStyle={

padding:18,

borderBottom:'1px solid #f1f5f9'

};