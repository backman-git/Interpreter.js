import chai from 'chai';
let expect = chai.expect;

import {Parser} from '../index';
import {Node} from "@bx/ast";

describe("Parser",()=>{
    it("Parsing test",()=>{
        var parser = new Parser();
        parser.parse("$a=1+1;");
        console.log(Node.genGraph(parser.getAST()));
    });
});