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

        //$b = 2+2;
        var nNumA1 = new NumNode(2);
        var nNumB1 = new NumNode(2);

        var nAdd1 = new OpNode('+',nNumA1,nNumB1);
        var nVarA1 = new VarNode("$b");
        var nAssign1= new AssignNode(nVarA1,nAdd1);
        var nStmt1 = new StmtNode(nAssign1);
        var nProgram1 = new ProgramNode(nStmt1);

        nProgram.concat(nProgram1);


        console.log("\t"+Node.genGraph(nProgram));


    });


});