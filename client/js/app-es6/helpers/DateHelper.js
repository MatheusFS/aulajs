class DateHelper {
    
    constructor(){
        throw new Error('DateHelper não pode ser instânciado');
    }
    
    static stringToDate(string){
        
        if(!/\d{4}-\d{2}-\d{2}/.test(string)) throw new Error('Deve estar no formato yyyy-mm-dd');
        return new Date(...string.split('-').map((item, indice) => item - indice % 2));
    }
    
    static dateToString(date){
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }
    
}