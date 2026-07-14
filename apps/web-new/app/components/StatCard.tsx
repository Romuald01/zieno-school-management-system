type Props={

title:string;

value:string;

};

export default function StatCard({

title,

value

}:Props){

return(

<div

style={{

background:'white',

padding:25,

borderRadius:12,

boxShadow:'0 5px 20px rgba(0,0,0,.08)'

}}

>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

);

}