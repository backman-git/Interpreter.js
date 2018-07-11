
import prompt from "prompt";
import {Parser} from "@bx/php-parser";
import {Interpreter} from "@bx/interpreter";
import {colors} from "colors";

prompt.message ="phpJs".cyan;
prompt.delimiter ="";
prompt.start();

var getStmt = (delimiter,fn)=>{

  prompt.get([{
    properties: {
      stmt: {
        description:delimiter
      }
    }
  }],(err,result)=>{
    fn(result.stmt);
    if(result.stmt != "bye")
      getStmt(delimiter,fn);
  });   

}

getStmt("~>".green,console.log);
