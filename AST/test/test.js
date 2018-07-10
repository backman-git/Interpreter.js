import chai from 'chai';
import {NumNode,OpNode,VarNode,AssignNode,StmtNode,ProgramNode,Node} from '../index';
let expect = chai.expect;


describe("Program",()=>{
    it("genGraph",()=>{
        //$a = 1+1;
        var nNumA = new NumNode(1);
        var nNumB = new NumNode(1);

        var nAdd = new OpNode('+',nNumA,nNumB);
        var nVarA = new VarNode("$a");
        var nAssign= new AssignNode(nVarA,nAdd);
        var nStmt = new StmtNode(nAssign);
        var nProgram = new ProgramNode(nStmt);

        console.log("\t"+Node.genGraph(nProgram));


    });


});