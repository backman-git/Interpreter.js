import chai from 'chai';
import {NumNode,OpNode,Node} from '../index';
let expect = chai.expect;


describe("NumNode",()=>{
    it("genGraph",()=>{
        //  1+2*3/4
        var op1 = new OpNode("+",null,null);
        var op2 = new OpNode("*",null,null);
        var op3 = new OpNode("/",null,null);

        var n1 = new NumNode(1);
        var n2 = new NumNode(2);
        var n3 = new NumNode(3);
        var n4 = new NumNode(4);

        //tree structure

        op2.left=op1;
        op2.right=op3;

        op1.left=n1;
        op1.right=n2;
        
        op3.left=n3;
        op3.right=n4;

        console.log("\t"+Node.genGraph(op2));


    });


});