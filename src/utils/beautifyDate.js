const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function beautifyDate(i_date){
    const d = new Date(i_date)
    const mno = d.getMonth()
    const month = {name:monthArray[mno],number:((mno+1) < 10)?'0'+(mno+1):(mno+1)}
    const year = d.getFullYear()
    const hours = (d.getHours() < 10)?'0'+d.getHours():d.getHours()
    const minutes = (d.getMinutes() < 10)?'0'+d.getMinutes():d.getMinutes()
    const date = (d.getDate() < 10)?'0'+d.getDate():d.getDate()

    if((new Date()).getFullYear() === year){
        if((new Date()).getDate() === d.getDate() && (new Date()).getMonth() === d.getMonth()){
            return hours+':'+minutes
        }else{
            return month.name+' '+date
        }
    }else{
        return date+'/'+month.number+'/'+year
    }
}