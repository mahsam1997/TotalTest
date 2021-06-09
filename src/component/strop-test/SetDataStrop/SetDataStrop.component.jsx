import Strop from '../Strop/Strop.component'
const SetDataStrop=()=>{
    const data=[
    {type:"cong", color:"#B10D0D",text:"قرمز",nameColor:"قرمز"},
    {type:"cong", color:"#4CA810",text:"سبز",nameColor:"سبز"},
    {type:"cong", color:"#F0E210",text:"زرد",nameColor:"زرد"},
    {type:"cong", color:"#1042F0",text:"آبی",nameColor:"آبی"},
    {type:"incong", color:"#1042F0",text:"سبز",nameColor:"آبی"},
    {type:"incong", color:"red",text:"زرد",nameColor:"قرمز"},
    {type:"incong", color:"green",text:"قرمز",nameColor:"سبز"}]

    const ascii=[{keyName:"سبز",codeE:83,codeF:115},{keyName:"زرد",codeE:68,codeF:100},
    {keyName:"آبی",codeE:75,codeF:107}
    ,{keyName:"قرمز",codeE:76,codeF:108}]
    return(
        <>
        <Strop  fixed={1000} isi={3000} t={5000} data={data} ascii={ascii}/>
        </>
    )
}
export default SetDataStrop;