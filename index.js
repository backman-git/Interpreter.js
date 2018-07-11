
import prompt from "prompt";
import {Parser} from "@bx/php-parser";
import {Interpreter} from "@bx/interpreter";
import {colors} from "colors";
import {Node} from "@bx/ast";

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

var parser = new Parser();
var interpreter = new Interpreter();

var main = (stmt)=>{

  var ast =parser.parseStmtToAST(stmt);
  interpreter.interpret(ast);
  console.log(interpreter.globalSymbolTlb);
  Node.genGraph(interpreter.tree);

};


getStmt("~>".green,main);
