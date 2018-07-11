import chai from 'chai';
let expect = chai.expect;

import {Parser} from '../index';
import {Node} from "@bx/ast";

describe("Parser",()=>{
    it("Parsing test",()=>{
        var parser = new Parser();
        var ast =parser.parseStmtToAST("$a=1+1;");
        console.log(Node.genGraph(ast));
    });
});