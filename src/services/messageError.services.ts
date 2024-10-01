export const messageError = (extraData?: any | undefined) => {
    const error: any = new Error();
    const lineNumber = error.stack.split('\n')[2].trim().split(':')[1];
    
    console.log(`(->>>>Line-${lineNumber}<<<<-)-->>>>🚀 ~ messageError ~ error:`, error,"<<<<<-----",'\n',"<<<<<<<<<<<<<<<-------------------------------------------------------------------------------------------" )
    if(extraData) console.log(`posibel solution: ${extraData}`)

}