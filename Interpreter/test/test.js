import chai from 'chai';
let expect = chai.expect;

import {Interpreter} from '../index';
import {ProgramNode,VarNode,OpNode,AssignNode,NumNode,StmtNode,Node} from '@bx/ast'

describe("Interpreter",()=>{
    it("interpreting test",()=>{
        //$a = 1+1;
        var nNumA = new NumNode(1);
        var nNumB = new NumNode(1);

        var nAdd = new OpNode('+',nNumA,nNumB);
        var nVarA = new VarNode("$a");
        var nAssign= new AssignNode(nVarA,nAdd);
        var nStmt = new StmtNode(nAssign);
        var nProgram = new ProgramNode(nStmt);

        var interpreter = new Interpreter(null);
        interpreter.interpret(nProgram);
        Node.genGraph(interpreter.tree);
        console.log("\t"+JSON.stringify(interpreter.globalSymbolTlb));

    });


});